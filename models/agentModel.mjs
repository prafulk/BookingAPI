import db from '../db/databaseConnection.mjs';

// Fetches a specific agent based on agentId
const getAgentById = async (agentId) => {
    try {
        const query = 'SELECT * FROM agents WHERE id = ?';
        const results = await db.query(query, [agentId]);
        return results[0];
    } catch (error) {
        throw new Error('Error fetching agent: ' + error.message);
    }
};

// Fetches all agents
const getAllAgents = async () => {
    try {
        const query = 'SELECT * FROM agents';
        const results = await db.query(query);
        return results;
    } catch (error) {
        throw new Error('Error fetching agents: ' + error.message);
    }
};

// Fetches all users associated with a specific agent
const getUsersForAgent = async (agentId) => {
    try {
        // Assuming there's a linking table or foreign key in users table that tracks which agent a user belongs to.
        const query = 'SELECT * FROM users WHERE agent_id = ?';
        const results = await db.query(query, [agentId]);
        return results;
    } catch (error) {
        throw new Error('Error fetching users for agent: ' + error.message);
    }
};

// Fetches all bookings made by a specific agent
const getBookingsForAgent = async (agentId) => {
    try {
        const query = 'SELECT * FROM bookings WHERE agent_id = ?';
        const results = await db.query(query, [agentId]);
        return results;
    } catch (error) {
        throw new Error('Error fetching bookings for agent: ' + error.message);
    }
};

export {
    getAgentById,
    getAllAgents,
    getUsersForAgent,
    getBookingsForAgent
};
