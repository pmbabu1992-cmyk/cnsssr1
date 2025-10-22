// src/api/routes/dashboards.routes.ts
import { makeCrudRoutes } from '../utils/crud.factory';
import { DashboardModel } from '../models/dashboard.model';
export default makeCrudRoutes('dashboards', DashboardModel);

