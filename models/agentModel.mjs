// agentModel.mjs

import { db } from '../db/connection.mjs';

// Fetch all agents from the database
export const fetchAllAgents = async () => {
    try {
        const query = `
            SELECT id, name, email 
            FROM agents
        `;

        const [rows] = await db.execute(query);
        return rows;

    } catch (error) {
        console.error(`Error fetching agents: ${error.message}`);
        throw error;
    }
};
