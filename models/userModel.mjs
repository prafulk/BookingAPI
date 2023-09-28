// userModel.mjs

import { db } from '../db/connection.mjs';

// Fetch all users associated with a specific agent
export const fetchUsersByAgent = async (agentId) => {
    try {
        const query = `
            SELECT u.id, u.name, u.email 
            FROM users AS u
            JOIN bookings AS b ON u.id = b.user_id
            WHERE b.agent_id = ?
            GROUP BY u.id, u.name, u.email
        `;

        const [rows] = await db.execute(query, [agentId]);
        return rows;

    } catch (error) {
        console.error(`Error fetching users by agent: ${error.message}`);
        throw error;
    }
};
