// src/api/routes/telemetry_data.routes.ts
import { makeCrudRoutes } from '../utils/crud.factory';
import { TelemetryDataModel } from '../models/telemetry_data.model';
export default makeCrudRoutes('telemetry_data', TelemetryDataModel);
