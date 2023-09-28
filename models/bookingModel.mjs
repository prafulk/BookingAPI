import { query } from '../db/databaseConnection.mjs';

export const createBooking = async (userId, agentId, start_at, finish_at) => {
    try {
        const result = await query(`
            INSERT INTO bookings (userId, agentId, start_at, finish_at) 
            VALUES (@0, @1, @2, @3)
        `, [userId, agentId, start_at, finish_at]);

        if (result.rowsAffected[0] > 0) {
            return { success: true, id: result.recordset[0].id };
        } else {
            return { success: false };
        }

    } catch (err) {
        console.error(err);
        throw new Error('Error creating booking.');
    }
};

export const deleteBooking = async (bookingId) => {
    try {
        const result = await query(`
            DELETE FROM bookings WHERE id = @0
        `, [bookingId]);

        return result.rowsAffected[0] > 0;

    } catch (err) {
        console.error(err);
        throw new Error('Error deleting booking.');
    }
};

export const getBookingById = async (bookingId) => {
    try {
        const result = await query(`
            SELECT * FROM bookings WHERE id = @0
        `, [bookingId]);

        return result.recordset[0];

    } catch (err) {
        console.error(err);
        throw new Error('Error fetching booking.');
    }
};

// ... (other functions can be added here, e.g., updating a booking, getting all bookings for a user/agent, etc.)
