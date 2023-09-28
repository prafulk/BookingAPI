import express from 'express';
import {
    createBooking,
    getBookings,
    deleteBooking
} from '../controllers/bookingController.mjs';
import { checkAgentId, authorization } from '../middlewares/index.mjs';

const router = express.Router();

// Get all bookings for a given week (Client API)
router.get('/scheduler', authorization('ADMIN', 'REGULAR'), getBookings);

// Create a booking (Client API)
router.post('/booking', authorization('ADMIN'), createBooking);

// Delete a specific booking by ID (Client API)
router.delete('/booking/:id', checkAgentId, authorization('ADMIN'), deleteBooking);

export default router;
