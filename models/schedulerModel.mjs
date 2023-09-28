// schedulerModel.mjs

import { db } from '../db/connection.mjs'; 
// Fetch bookings for a specific week
export const fetchBookingsForWeek = async (startDate, endDate) => {
    try {
        const query = `
            SELECT b.id, u.name as userName, u.email as userEmail, a.name as agentName, a.email as agentEmail, b.start_at, b.finish_at
            FROM bookings AS b
            JOIN users AS u ON b.user_id = u.id
            JOIN agents AS a ON b.agent_id = a.id
            WHERE b.start_at >= ? AND b.finish_at <= ?
        `;

        const [rows] = await db.execute(query, [startDate, endDate]);
        return rows;

    } catch (error) {
        console.error(`Error fetching bookings for the week: ${error.message}`);
        throw error;
    }
};
