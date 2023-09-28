import express from 'express';
import {
    getAllAgents,
    getAgentById,
    createAgent,
    updateAgent,
    deleteAgent
} from '../controllers/agentController.mjs';
import { checkAgentId, authorization } from '../middlewares/index.mjs';

const router = express.Router();

// Get all agents (ADMIN only)
router.get('/agents', authorization('ADMIN'), getAllAgents);

// Get a specific agent by ID (self-check and ADMIN)
router.get('/agents/:id', checkAgentId, authorization('ADMIN', 'SELF'), getAgentById);

// Create a new agent (ADMIN only, or possibly even restricted further)
router.post('/agents', authorization('ADMIN'), createAgent);

// Update an agent's details (self-check and ADMIN)
router.put('/agents/:id', checkAgentId, authorization('ADMIN', 'SELF'), updateAgent);

// Delete an agent by ID (ADMIN only, for security reasons)
router.delete('/agents/:id', checkAgentId, authorization('ADMIN'), deleteAgent);

export default router;
