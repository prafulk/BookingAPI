import express from 'express';
import { getBookingsForWeek } from '../controllers/schedulerController.mjs';

const router = express.Router();

// Get bookings for a specific week
router.get('/scheduler', getBookingsForWeek);

export default router;
