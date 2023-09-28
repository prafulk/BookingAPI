import express from 'express';
import { getUsersByAgent } from '../controllers/userController.mjs';

const router = express.Router();

// Get all users for a specific agent
router.get('/users', getUsersByAgent);

export default router;
