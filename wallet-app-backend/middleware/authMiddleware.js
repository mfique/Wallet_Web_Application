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
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err.message);
                return res.status(401).json({ message: 'Invalid or expired token.' });
            }

            // Attach decoded user data to the request object
            req.user = decoded;
            console.log('Token verified successfully. User:', req.user);  // Debugging line

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (err) {
        console.error('Unexpected error in authMiddleware:', err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware;
