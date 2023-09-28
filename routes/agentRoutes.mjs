import express from 'express';
import { getAllAgents } from '../controllers/agentController.mjs';

const router = express.Router();

// Get all agents
router.get('/agents', getAllAgents);

export default router;
