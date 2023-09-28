import express from 'express';
import schedulerRoutes from './schedulerRoutes.mjs';
import bookingRoutes from './bookingRoutes.mjs';
import userRoutes from './userRoutes.mjs';
import agentRoutes from './agentRoutes.mjs';

const router = express.Router();

// Combine all the routes
router.use(schedulerRoutes);
router.use(bookingRoutes);
router.use(userRoutes);
router.use(agentRoutes);

export default router;
