import { Router } from 'express';
const adminDashboardRoute = Router();

import authenticateJWT from '../authentication/jwtAuthentication.js';
import authorizeRole from '../middleware/authorizeRole.js';
import adminDashboard from '../controllers/adminController.js';

/**
 * Route for homepage.
 */
adminDashboardRoute.get(
  '/admin-dashboard',
  authenticateJWT,
  authorizeRole(['ADMIN']),
  adminDashboard
);

export default adminDashboardRoute;
