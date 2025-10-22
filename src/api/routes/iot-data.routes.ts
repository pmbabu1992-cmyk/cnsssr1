// src/api/routes/iot-data.routes.ts
import { makeCrudRoutes } from '../utils/crud.factory';
import { IoTDataModel } from '../models/iot_data.model';
export default makeCrudRoutes('iot-data', IoTDataModel);
