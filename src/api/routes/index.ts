// import { Router } from 'express';

// import auditLogs from './audit_logs.routes';
// import dashboards from './dashboards.routes';
// import devices from './devices.routes';
// import iotData from './iot-data.routes';
// import organizations from './organizations.routes';
// import profiles from './profiles.routes';
// import sensordata from './sensordata.routes';
// import sensordatas from './sensordatas.routes';
// import telemetryData from './telemetry_data.routes';
// import users from './users.routes';
// import widgets from './widgets.routes';

// export function buildApiV1() {
//   const api = Router();

//   api.get('/health', (_req, res) => res.json({ ok: true }));

//   api.use('/audit_logs', auditLogs);
//   api.use('/dashboards', dashboards);
//   api.use('/devices', devices);
//   api.use('/iot-data', iotData);
//   api.use('/organizations', organizations);
//   api.use('/profiles', profiles);
//   api.use('/sensordata', sensordata);
//   api.use('/sensordatas', sensordatas);
//   api.use('/telemetry_data', telemetryData);
//   api.use('/users', users);
//   api.use('/widgets', widgets);

//   return api;
// }



// src/api/routes/index.ts
import { Router, type Request, type Response } from 'express';

import auditLogs     from './audit_logs.routes';
import dashboards    from './dashboards.routes';
import devices       from './devices.routes';
import iotData       from './iot-data.routes';
import organizations from './organizations.routes';
import profiles      from './profiles.routes';
import sensordata    from './sensordata.routes';
import sensordatas   from './sensordatas.routes';
import telemetryData from './telemetry_data.routes';
import users         from './users.routes';
import widgets       from './widgets.routes';

export function buildApiV1() {
  const api = Router();

  // Lightweight health for API only (you also have /api/health in server.ts)
  api.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

  // Map of mount path -> router
  const routes: Array<[string, Router]> = [
    ['/audit_logs',     auditLogs],
    ['/dashboards',     dashboards],
    ['/devices',        devices],
    ['/iot-data',       iotData],
    ['/organizations',  organizations],
    ['/profiles',       profiles],
    ['/sensordata',     sensordata],
    ['/sensordatas',    sensordatas],
    ['/telemetry_data', telemetryData],
    ['/users',          users],
    ['/widgets',        widgets],
  ];

  for (const [path, router] of routes) {
    api.use(path, router);
  }

  // API-scoped 404 for unknown endpoints under /api/v1/*
  api.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
  });

  return api;
}
