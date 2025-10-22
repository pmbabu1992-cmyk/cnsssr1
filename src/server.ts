// import {
//   AngularNodeAppEngine,
//   createNodeRequestHandler,
//   isMainModule,
//   writeResponseToNodeResponse,
// } from '@angular/ssr/node';
// import express from 'express';
// import { join } from 'node:path';

// const browserDistFolder = join(import.meta.dirname, '../browser');

// const app = express();
// const angularApp = new AngularNodeAppEngine();

// /**
//  * Example Express Rest API endpoints can be defined here.
//  * Uncomment and define endpoints as necessary.
//  *
//  * Example:
//  * ```ts
//  * app.get('/api/{*splat}', (req, res) => {
//  *   // Handle API request
//  * });
//  * ```
//  */

// /**
//  * Serve static files from /browser
//  */
// app.use(
//   express.static(browserDistFolder, {
//     maxAge: '1y',
//     index: false,
//     redirect: false,
//   }),
// );

// /**
//  * Handle all other requests by rendering the Angular application.
//  */
// app.use((req, res, next) => {
//   angularApp
//     .handle(req)
//     .then((response) =>
//       response ? writeResponseToNodeResponse(response, res) : next(),
//     )
//     .catch(next);
// });

// /**
//  * Start the server if this module is the main entry point.
//  * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
//  */
// if (isMainModule(import.meta.url)) {
//   const port = process.env['PORT'] || 4000;
//   app.listen(port, (error) => {
//     if (error) {
//       throw error;
//     }

//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

// /**
//  * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
//  */
// export const reqHandler = createNodeRequestHandler(app);


// below is the new updaed one


// src/server.ts

// src/server.ts
import 'dotenv/config'; // Load .env if present

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { connectMongo, disconnectMongo } from './lib/mongo';
import { buildApiV1 } from './api/routes/index';

// ---------- Angular SSR ----------
const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();

// ---------- Env ----------
const PORT = Number(process.env['PORT'] ?? 4000);
const MONGO_URI = process.env['MONGO_URI'] ?? 'mongodb://127.0.0.1:27017/cns';

// ---------- Basics for APIs ----------
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ---------- MongoDB (connect once) ----------
connectMongo(MONGO_URI).catch((e) => console.error('[mongo] connection error:', e));

// ---------- Quick health & DB ping ----------
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/db/ping', async (_req, res) => {
  try {
    const { default: mongoose } = await import('mongoose');
    const conn = mongoose.connection;

    // 1 = connected, 2 = connecting, 0 = disconnected, 3 = disconnecting
    if (conn.readyState !== 1) {
      return res.status(503).json({ ok: false, error: 'Mongo not connected', state: conn.readyState });
    }

    // Use underlying MongoClient (defined when connected)
    const client = conn.getClient();
    const result = await client.db().admin().ping();

    return res.json({ ok: true, result });
  } catch (err) {
    console.error('[mongo] ping failed:', err);
    return res.status(500).json({ ok: false, error: 'Mongo ping failed' });
  }
});

// ---------- Versioned API router ----------
const apiV1 = buildApiV1(); // gives /health and all collections CRUD
app.use('/api/v1', apiV1);

// ---------- OpenAPI (programmatic minimal spec) ----------
const collections = [
  'audit_logs', 'dashboards', 'devices', 'iot-data', 'organizations',
  'profiles', 'sensordata', 'sensordatas', 'telemetry_data', 'users', 'widgets'
];

const paths: Record<string, any> = {};
for (const col of collections) {
  paths[`/api/v1/${col}`] = {
    get:  { summary: `List ${col}`, tags: [col], responses: { 200: { description: 'OK' } } },
    post: { summary: `Create ${col.slice(0, -1)}`, tags: [col], responses: { 201: { description: 'Created' } } },
  };
  paths[`/api/v1/${col}/{id}`] = {
    get:    { summary: `Get ${col} by id`,    tags: [col], parameters: [{ name: 'id', in: 'path', required: true }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
    put:    { summary: `Replace ${col} by id`, tags: [col], parameters: [{ name: 'id', in: 'path', required: true }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
    patch:  { summary: `Update ${col} by id`,  tags: [col], parameters: [{ name: 'id', in: 'path', required: true }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
    delete: { summary: `Delete ${col} by id`,  tags: [col], parameters: [{ name: 'id', in: 'path', required: true }], responses: { 204: { description: 'No Content' }, 404: { description: 'Not found' } } },
  };
}

// Serve the OpenAPI spec as JSON (dynamic server URL)
app.get('/api/openapi.json', (req, res) => {
  const serverUrl = `${req.protocol}://${req.get('host')}`;
  const openapi = {
    openapi: '3.0.0',
    info: { title: 'CNS API', version: '1.0.0' },
    servers: [{ url: serverUrl }],
    paths,
  };
  res.json(openapi);
});

// Serve Swagger UI via CDN (ESM-friendly; no __dirname)
app.get('/api/docs', (_req, res) => {
  res.type('html').send(`<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
  <style>body{margin:0}#swagger{height:100vh}</style>
</head>
<body>
  <div id="swagger"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    window.ui = SwaggerUIBundle({
      url: '/api/openapi.json',
      dom_id: '#swagger'
    });
  </script>
</body>
</html>`);
});

// ---------- Static assets from /browser ----------
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// ---------- SSR catch-all ----------
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// ---------- Error handler ----------
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ---------- Start (prod) + Graceful shutdown ----------
let server: import('http').Server | undefined;

function shutdown(reason: string) {
  console.log(`[shutdown] ${reason}`);
  try {
    server?.close?.(() => {
      // after HTTP closes, disconnect Mongo
      disconnectMongo().finally(() => process.exit(0));
    });
    // If server was not started (e.g., running via CLI dev handler), still disconnect
    if (!server) {
      disconnectMongo().finally(() => process.exit(0));
    }
  } catch {
    disconnectMongo().finally(() => process.exit(0));
  }
}

process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('unhandledRejection', (err: any) => { console.error('[unhandledRejection]', err); shutdown('unhandledRejection'); });
process.on('uncaughtException', (err: any) => { console.error('[uncaughtException]', err); shutdown('uncaughtException'); });

if (isMainModule(import.meta.url)) {
  server = app.listen(PORT, (error?: unknown) => {
    if (error) throw error as any;
    console.log(`SSR + API listening on http://localhost:${PORT}`);
    console.log(`Swagger UI:           http://localhost:${PORT}/api/docs`);
    console.log(`Mongo URI:            ${MONGO_URI}`);
  });
}

// ---------- Request handler used by Angular CLI dev server ----------
export const reqHandler = createNodeRequestHandler(app);
