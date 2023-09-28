import Agent from '../models/agentModel.mjs';  // Import the Agent model

/**
 * Middleware to check if an agent has a specific role.
 * 
 * This middleware fetches the role of the agent (based on the agentId from the request) 
 * from the database and ensures they have the necessary role to access the endpoint.
 * If not, it sends a 403 Forbidden response.
 *
 * @param {string} requiredRole - The role required to access the endpoint
 * @return {function} - Express middleware function that checks the agent's role
 */
function requireRole(requiredRole) {
    return async (req, res, next) => {
        const agentId = req.agentId;

        try {
            // Fetching the agent from the database using the provided agentId
            const agent = await Agent.findOne({ where: { id: agentId } });

            // If agent doesn't exist or doesn't have the required role
            if (!agent || agent.role !== requiredRole) {
                return res.status(403).json({
                    status: 'failure',
                    message: `Access denied. Requires ${requiredRole} role.`
                });
            }

            // If the agent has the required role, continue to the next middleware/route handler
            next();
        } catch (err) {
            // Handle any database or other errors
            console.error(err);
            res.status(500).json({
                status: 'failure',
                message: 'Internal Server Error'
            });
        }
    };
}

export { requireRole };
