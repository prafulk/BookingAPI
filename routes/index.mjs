import express from 'express';
import agentRoutes from './agentRoutes.mjs';
import bookingRoutes from './bookingRoutes.mjs';
import schedulerRoutes from './schedulerRoutes.mjs';
import userRoutes from './userRoutes.mjs';

const router = express.Router();

// Mount the routes to their respective endpoints
router.use('/agents', agentRoutes);
router.use('/bookings', bookingRoutes);
router.use('/scheduler', schedulerRoutes);
router.use('/users', userRoutes);

export default router;
