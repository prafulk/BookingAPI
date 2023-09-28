import Agent from '../models/agentModel.mjs';

// A mock roles object for demonstration. In a real-world scenario, these roles can come from a database.
const rolesPermissions = {
    'ADMIN': ['read', 'write', 'delete'], // Admin can perform all actions
    'REGULAR': ['read'] // Regular agent can only read
};

const authorization = async (req, res, next) => {
    try {
        if (!req.agent) {
            throw new Error('Agent information is missing.');
        }

        const agentRole = req.agent.role; // Assuming the Agent model has a "role" attribute

        if (!agentRole || !rolesPermissions[agentRole]) {
            return res.status(403).send({ error: 'Role not recognized.' });
        }

        // Determine the requested action based on HTTP method
        let action;
        switch (req.method) {
            case 'GET':
                action = 'read';
                break;
            case 'POST':
                action = 'write';
                break;
            case 'DELETE':
                action = 'delete';
                break;
            // Add cases for other HTTP methods (PUT, PATCH, etc.) if needed
            default:
                return res.status(405).send({ error: 'Method not allowed.' });
        }

        // Check if the agent's role permits the determined action
        if (rolesPermissions[agentRole].includes(action)) {
            next();
        } else {
            res.status(403).send({ error: 'You do not have permission to perform this action.' });
        }

    } catch (error) {
        console.error('Authorization Error:', error);
        res.status(500).send({ error: 'Internal Server Error.' });
    }
};

export default authorization;
