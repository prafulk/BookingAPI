import express from 'express';
import { query } from '../db/databaseConnection.mjs';

const router = express.Router();

// Endpoint: POST /booking
// Purpose: Create a booking for a user which belongs to the current agent
router.post('/booking', async (req, res) => {
    try {
        const { userId, start_at, finish_at } = req.body;
        const agentId = req.agentId;

        if (!userId || !start_at || !finish_at) {
            return res.status(400).send({ error: 'Missing required fields.' });
        }

        const result = await query(`
            INSERT INTO bookings (userId, agentId, start_at, finish_at) 
            VALUES (@0, @1, @2, @3)
        `, [userId, agentId, start_at, finish_at]);

        if (result.rowsAffected[0] === 0) {
            return res.status(400).send({ error: 'Failed to create booking.' });
        }

        res.status(201).send({ message: 'Booking created successfully.' });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred while creating the booking.' });
    }
});

// Endpoint: DELETE /booking/:id
// Purpose: Delete booking
router.delete('/booking/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const result = await query(`
            DELETE FROM bookings WHERE id = @0
        `, [bookingId]);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send({ error: 'Booking not found.' });
        }

        res.status(200).send({ message: 'Booking deleted successfully.' });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred while deleting the booking.' });
    }
});

export default router;
