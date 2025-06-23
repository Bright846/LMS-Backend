
export default function errorHandler(err, req, res, next) {
    // Default status code and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    // Handle duplicate key errors (unique constraints)
    if (err.code && err.code === 11000) {
        statusCode = 409;
        message = `Duplicate key error: ${JSON.stringify(err.keyValue)}`;
    }

    // Optionally log the error (helpful in development)
    if (process.env.NODE_ENV !== 'production') {
        console.error(err);
    }

    res.status(statusCode).json({
        status: "error",
        message
    });
}
