// src/api/routes/widgets.routes.ts
import { makeCrudRoutes } from '../utils/crud.factory';
import { WidgetsModel } from '../models/widget.model';
export default makeCrudRoutes('widgets', WidgetsModel);
