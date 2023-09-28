import express from 'express';
import {
    getAllUsers
} from '../controllers/userController.mjs';
import { authorization } from '../middlewares/index.mjs';

const router = express.Router();

// Get all users for a particular agent
router.get('/users', authorization('ADMIN', 'REGULAR'), getAllUsers);

export default router;
