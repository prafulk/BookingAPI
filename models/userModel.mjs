import { query } from '../db/databaseConnection.mjs';

// Get all users associated with a specific agent
export const getUsersByAgent = async (agentId) => {
    try {
        const result = await query(`
            SELECT u.id, u.name, u.email 
            FROM users u
            WHERE u.agentId = @0
        `, [agentId]);

        return result.recordset;

    } catch (err) {
        console.error(err);
        throw new Error('Error fetching users for the agent.');
    }
};

// Get a specific user by ID
export const getUserById = async (userId) => {
    try {
        const result = await query(`
            SELECT id, name, email 
            FROM users 
            WHERE id = @0
        `, [userId]);

        return result.recordset[0];  // Return the first user since IDs are unique

    } catch (err) {
        console.error(err);
        throw new Error('Error fetching the user.');
    }
};

// Create a new user
export const createUser = async (name, email, agentId) => {
    try {
        const result = await query(`
            INSERT INTO users (name, email, agentId) 
            VALUES (@0, @1, @2);
            SELECT SCOPE_IDENTITY() as id;
        `, [name, email, agentId]);

        return result.recordset[0].id;  // Return the ID of the newly created user

    } catch (err) {
        console.error(err);
        throw new Error('Error creating the user.');
    }
};

// Update a user's details
export const updateUser = async (userId, name, email) => {
    try {
        await query(`
            UPDATE users 
            SET name = @0, email = @1 
            WHERE id = @2
        `, [name, email, userId]);

        return true;

    } catch (err) {
        console.error(err);
        throw new Error('Error updating the user.');
    }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
    try {
        await query(`
            DELETE FROM users 
            WHERE id = @0
        `, [userId]);

        return true;

    } catch (err) {
        console.error(err);
        throw new Error('Error deleting the user.');
    }
};
