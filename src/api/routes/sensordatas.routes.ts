// src/api/routes/sensordatas.routes.ts
import { makeCrudRoutes } from '../utils/crud.factory';
import { SensorDatasModel } from '../models/sensordatas.model';
export default makeCrudRoutes('sensordatas', SensorDatasModel);
