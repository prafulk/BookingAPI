import express from 'express';
import { createBooking, deleteBooking } from '../controllers/bookingController.mjs';

const router = express.Router();

// Create a new booking
router.post('/booking', createBooking);

// Delete a booking
router.delete('/booking/:id', deleteBooking);

export default router;
