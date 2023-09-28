import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../models/userModel.mjs';

// Fetch all users that the specific agent can access
const listAllUsersByAgent = async (req, res, next) => {
    try {
        const agentId = req.agentId;
        const users = await getAllUsers({ agentId });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Fetch specific user details, including their bookings
const getUserDetails = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Create a new user
const addUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

// Update an existing user's details
const modifyUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await updateUser(userId, userData);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// Delete a specific user
const removeUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await deleteUser(userId);

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export {
    listAllUsersByAgent,
    getUserDetails,
    addUser,
    modifyUser,
    removeUser
};
