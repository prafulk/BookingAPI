import { query } from '../db/databaseConnection.mjs';

export const getBookingsForWeek = async (weekStartDate) => {
    try {
        // Assuming weekStartDate is the start of the week, we want to get bookings from this date to 6 days ahead.
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekEndDate.getDate() + 6);

        const result = await query(`
            SELECT b.id as booking_id, b.start_at, b.finish_at, u.id as user_id, u.name as user_name, a.id as agent_id, a.name as agent_name 
            FROM bookings b
            JOIN users u ON b.userId = u.id
            JOIN agents a ON b.agentId = a.id
            WHERE b.start_at >= @0 AND b.start_at <= @1
        `, [weekStartDate, weekEndDate]);

        return result.recordset;

    } catch (err) {
        console.error(err);
        throw new Error('Error fetching bookings for the week.');
    }
};

// ... (additional functions can be added, if needed, to handle other scheduler related tasks)
