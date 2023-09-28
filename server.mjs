import express from 'express';
import bodyParser from 'body-parser';
import combinedRoutes from './routes/index.mjs';  // Import combined routes

const app = express();
const PORT = 3000;

// Middlewares

// Use body-parser to parse JSON requests
app.use(bodyParser.json());

// Middleware to check for the "X-Agent-Id" header
app.use((req, res, next) => {
    if (!req.headers['x-agent-id']) {
        return res.status(400).send({ error: 'X-Agent-Id header is missing.' });
    }
    // Add the agent ID to the request object for use in other routes
    req.agentId = req.headers['x-agent-id'];
    next();
});

// Use combined routes from the routes directory
app.use('/api', combinedRoutes);

// Sample route, which can be moved or replaced as your app evolves
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
