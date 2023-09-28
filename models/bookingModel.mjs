// bookingModel.mjs

import { db } from '../db/connection.mjs';

// Create a booking
export const createBooking = async (bookingData) => {
    try {
        const { userId, agentId, startAt, finishAt } = bookingData;

        const query = `
            INSERT INTO bookings (user_id, agent_id, start_at, finish_at)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.execute(query, [userId, agentId, startAt, finishAt]);
        return { id: result.insertId, ...bookingData }; // Return new booking data including new ID

    } catch (error) {
        console.error(`Error creating booking: ${error.message}`);
        throw error;
    }
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
    try {
        const query = `
            DELETE FROM bookings
            WHERE id = ?
        `;

        const [result] = await db.execute(query, [bookingId]);
        return result;

    } catch (error) {
        console.error(`Error deleting booking: ${error.message}`);
        throw error;
    }
};
