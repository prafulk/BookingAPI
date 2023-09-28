import Agent from '../models/agentModel.mjs';

const checkAgentId = async (req, res, next) => {
    const agentId = req.headers['x-agent-id'];

    if (!agentId) {
        return res.status(400).send({ error: 'X-Agent-Id header is missing.' });
    }

    try {
        // Check if the agent with the provided ID exists in the database
        const agent = await Agent.findByPk(agentId);

        if (!agent) {
            return res.status(404).send({ error: 'Agent not found.' });
        }

        // Store the agent information in the request for further processing in subsequent routes/middleware
        req.agent = agent;

        next();
    } catch (error) {
        console.error('Error verifying Agent ID:', error);
        res.status(500).send({ error: 'Internal Server Error.' });
    }
};

export default checkAgentId;
