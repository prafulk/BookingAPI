import { fetchUsersByAgent } from '../models/userModel.mjs';

// Fetch all users for a specific agent
export const getUsersByAgent = async (req, res) => {
    try {
        const agentId = req.headers['X-Agent-Id'];

        // If no agent ID provided, return error
        if (!agentId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required agent ID in headers.',
            });
        }

        const users = await fetchUsersByAgent(agentId);

        // If no users found for this agent
        if (!users.length) {
            return res.status(404).json({
                success: false,
                message: `No users found for agent ID: ${agentId}`,
            });
        }

        res.status(200).json({
            success: true,
            data: users,
        });

    } catch (error) {
        console.error(`Error fetching users by agent: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};
