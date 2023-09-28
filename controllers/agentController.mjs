import { fetchAllAgents } from '../models/agentModel.mjs';

// Fetch all agents
export const getAllAgents = async (req, res) => {
    try {
        const agents = await fetchAllAgents();

        if (!agents.length) {
            return res.status(404).json({
                success: false,
                message: 'No agents found.',
            });
        }

        res.status(200).json({
            success: true,
            data: agents,
        });

    } catch (error) {
        console.error(`Error fetching agents: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};
