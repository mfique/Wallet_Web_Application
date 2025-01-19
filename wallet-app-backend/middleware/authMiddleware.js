const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided or invalid format.' });
        }

        const token = authHeader.replace('Bearer ', '').trim();

        // Verify the token
        // Attach decoded user data to the request object
        req.user = jwt.verify(token, process.env.JWT_SECRET);

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
