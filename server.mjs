import express from 'express';
import bodyParser from 'body-parser';
// You can import other required modules/libraries as you progress

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());

// A middleware to check for the "X-Agent-Id" header
app.use((req, res, next) => {
    if (!req.headers['x-agent-id']) {
        return res.status(400).send({ error: 'X-Agent-Id header is missing.' });
    }
    // Add the agent ID to the request object for use in other routes
    req.agentId = req.headers['x-agent-id'];
    next();
});

// Sample routes (You can separate these into different route files later)
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Placeholder for other routes like /scheduler, /booking, /users, /agents, etc.

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

