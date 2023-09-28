// Middleware to validate and check the "X-Agent-Id" header

/**
 * This middleware checks if the "X-Agent-Id" header is present in the incoming request.
 * If the header is present, it attaches the agentId to the request object for future use.
 * Otherwise, it sends a 400 Bad Request response indicating the missing header.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
function checkAgentId(req, res, next) {
    const agentIdHeader = req.headers['x-agent-id'];

    // Check if the X-Agent-Id header is missing
    if (!agentIdHeader) {
        return res.status(400).json({
            status: 'failure',
            message: 'X-Agent-Id header is missing.'
        });
    }

    // Further validations can be added here. For example:
    // - Check if the agentId format is correct
    // - Check if the agentId exists in the system/database (though this might be overkill for just middleware)

    // Attach the agentId to the request object
    req.agentId = agentIdHeader;

    // Continue to the next middleware/route handler
    next();
}

export default checkAgentId;
