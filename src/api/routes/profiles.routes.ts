// src/api/routes/profiles.routes.ts
import { makeCrudRoutes } from '../utils/crud.factory';
import { ProfileModel } from '../models/profile.model';
export default makeCrudRoutes('profiles', ProfileModel);
