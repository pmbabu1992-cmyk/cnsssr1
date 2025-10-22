// src/api/routes/sensordata.routes.ts
import { makeCrudRoutes } from '../utils/crud.factory';
import { SensorDataModel } from '../models/sensordata.model';
export default makeCrudRoutes('sensordata', SensorDataModel);
