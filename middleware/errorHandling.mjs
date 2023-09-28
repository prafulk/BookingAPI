const errorHandling = (err, req, res, next) => {
    // Log the error for debugging and monitoring purposes
    console.error(`[${new Date().toISOString()}] [${req.method} ${req.url}]`, err.stack || err.message);

    // Differentiate errors based on their nature
    if (err.name === 'ValidationError') {
        // Handle validation errors (for instance, from a library like Joi or express-validator)
        return res.status(400).send({ error: err.message });
    }

    if (err.name === 'SequelizeError') {
        // Handle database errors (for Sequelize ORM in this case)
        return res.status(500).send({ error: 'Database error. Please try again later.' });
    }

    if (err.name === 'NotFoundError') {
        // Handle not-found errors, which you can custom throw in your controllers
        return res.status(404).send({ error: err.message || 'Resource not found.' });
    }

    // Add more custom error types as needed...

    // For any other type of error, send a generic error message
    return res.status(500).send({ error: 'An unexpected error occurred. Please try again later.' });
};

export default errorHandling;
