// src/api/routes/users.routes.ts
import { makeCrudRoutes } from '../utils/crud.factory';
import { UsersModel } from '../models/user.model';
export default makeCrudRoutes('users', UsersModel);
