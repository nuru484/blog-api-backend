import { Router } from 'express';
const adminDashboardRoute = Router();

import authenticateJWT from '../authentication/jwtAuthentication.js';
import authorizeRole from '../middleware/authorizeRole.js';
import adminDashboard from '../controllers/adminDashboardController.js';

/**
 * Route for homepage.
 */
adminDashboardRoute.get(
  '/admin-dashboard',
  authenticateJWT,
  //   authorizeRole(['admin']),
  adminDashboard
);

export default adminDashboardRoute;
