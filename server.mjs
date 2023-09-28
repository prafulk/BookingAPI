import express from 'express';
import bodyParser from 'body-parser';
import combinedRoutes from './routes/index.mjs';  // Import combined routes
import checkAgentId from './middlewares/checkAgentId.mjs';  // Import middleware for Agent ID check
import errorHandling from './middlewares/errorHandling.mjs';  // Import our advanced error handling middleware

const app = express();
const PORT = 3000;

// Middlewares

// Use body-parser to parse JSON requests
app.use(bodyParser.json());

// Middleware to check for the "X-Agent-Id" header
app.use(checkAgentId);

// Use combined routes from the routes directory
app.use('/api', combinedRoutes);

// Sample route, which can be moved or replaced as your app evolves
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Advanced error handler
app.use(errorHandling);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
