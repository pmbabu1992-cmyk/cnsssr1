// src/api/routes/organizations.routes.ts
import { makeCrudRoutes } from '../utils/crud.factory';
import { OrganizationsModel } from '../models/organization.model';
export default makeCrudRoutes('organizations', OrganizationsModel);

