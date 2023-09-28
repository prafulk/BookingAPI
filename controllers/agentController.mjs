import { getAgentById, getAllAgents, createAgent, updateAgent, deleteAgent } from '../models/agentModel.mjs';

// Get all agents (ADMIN only)
const listAllAgents = async (req, res, next) => {
    try {
        const agents = await getAllAgents();
        res.status(200).json(agents);
    } catch (error) {
        next(error);
    }
};

// Get agent by ID and their associated users and bookings (ADMIN only)
const getAgentDetails = async (req, res, next) => {
    try {
        const agentId = req.params.id;
        const agent = await getAgentById(agentId, { includeRelations: true });
        
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        res.status(200).json(agent);
    } catch (error) {
        next(error);
    }
};

// Create a new agent (ADMIN only)
const addAgent = async (req, res, next) => {
    try {
        const agentData = req.body;
        const newAgent = await createAgent(agentData);
        res.status(201).json(newAgent);
    } catch (error) {
        next(error);
    }
};

// Update an existing agent's details (ADMIN only)
const modifyAgent = async (req, res, next) => {
    try {
        const agentData = req.body;
        const agentId = req.params.id;
        
        const updatedAgent = await updateAgent(agentId, agentData);
        
        if (!updatedAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        res.status(200).json(updatedAgent);
    } catch (error) {
        next(error);
    }
};

// Delete an agent (ADMIN only)
const removeAgent = async (req, res, next) => {
    try {
        const agentId = req.params.id;
        const result = await deleteAgent(agentId);
        
        if (!result) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        res.status(200).json({ message: 'Agent deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export {
    listAllAgents,
    getAgentDetails,
    addAgent,
    modifyAgent,
    removeAgent
};
