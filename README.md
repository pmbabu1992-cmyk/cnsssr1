# Cs

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




<!-- for custom -->


Here’s the end-to-end command list to get everything running in your browser (Angular 20 + SSR + Express APIs + Swagger + Mongo). I’ll show Dev (recommended) and Prod. Use PowerShell/CMD from your project root.

0) Prereqs

Node 18+ (or 20+)

MongoDB running locally (or a connection string)

If you don’t have Mongo running locally, either:

Start local service (Windows): open Services → start MongoDB, or

Run a quick Docker Mongo:

docker run -d --name mongo -p 27017:27017 -v mongo_data:/data/db mongo:7

1) Install dependencies
# from your Angular workspace root (where package.json is)
npm i mongoose swagger-ui-express
# typings for Swagger (or use the .d.ts file I gave)
npm i -D @types/swagger-ui-express


If you chose the local declaration instead, make sure src/types/swagger-ui-express.d.ts exists and your tsconfig.app.json includes src/**/*.d.ts (I already provided that config).

2) Environment variables (Dev)

If your Mongo is local:

# PowerShell (Windows)
$env:PORT="4500"
$env:MONGO_URI="mongodb://127.0.0.1:27017/cns"


For CMD:

set PORT=4500
set MONGO_URI=mongodb://127.0.0.1:27017/cns


If you use a remote cluster, set MONGO_URI accordingly.

3) Start Dev server (SSR + APIs + Swagger)
ng serve -o -p 4500

Open in the browser

App (SSR): http://localhost:4500/

Swagger UI: http://localhost:4500/api/docs

Example API:

List devices: GET http://localhost:4500/api/v1/devices

Create device: POST http://localhost:4500/api/v1/devices

Body (JSON):

{ "device_name": "A-100" }

4) Build & Run in Prod (optional)
# build SSR
ng build

# set envs for prod port & mongo (PowerShell)
$env:PORT="4000"
$env:MONGO_URI="mongodb://127.0.0.1:27017/cns"

# start the Node SSR server (replace <project-name> with your Angular project folder under dist)
node dist/<project-name>/server/server.mjs

Open in the browser (Prod)

App (SSR): http://localhost:4000/

Swagger UI: http://localhost:4000/api/docs

APIs: http://localhost:4000/api/v1/
...

5) Quick sanity checks

Terminal should log:

[mongo] connected

SSR + API listening on http://localhost:<PORT>

Swagger UI: http://localhost:<PORT>/api/docs

In Swagger, you should see tags for:
audit_logs, dashboards, devices, iot-data, organizations, profiles, sensordata, sensordatas, telemetry_data, users, widgets.

6) Common hiccups (fast fixes)

TS error about swagger-ui-express → run npm i -D @types/swagger-ui-express or ensure src/types/swagger-ui-express.d.ts exists and tsconfig.app.json includes it.

Property 'id' comes from an index signature → you already switched to bracket access in crud.factory.ts as shown.

Mongo connection refused → check MONGO_URI and ensure Mongo service/container is running.

If you paste your exact dist/<project-name> name, I’ll give you the exact node dist/.../server/server.mjs command for prod.