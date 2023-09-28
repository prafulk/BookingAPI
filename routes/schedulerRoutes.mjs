import express from 'express';
import {
    getWeekBookings
} from '../controllers/schedulerController.mjs';
import { authorization } from '../middlewares/index.mjs';

const router = express.Router();

// Get all bookings for a specific week (Client API)
router.get('/scheduler', authorization('ADMIN', 'REGULAR'), getWeekBookings);

// A scaffold for the Business API side of the scheduler
router.get('/scheduler-business', (req, res) => {
    res.status(200).send('OK');
});

export default router;
