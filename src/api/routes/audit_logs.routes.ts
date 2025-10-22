// src/api/routes/audit_logs.routes.ts
import { makeCrudRoutes } from '../utils/crud.factory';
import { AuditLogModel } from '../models/audit_log.model';
export default makeCrudRoutes('audit_logs', AuditLogModel);
