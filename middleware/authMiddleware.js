const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token in authMiddleware:", decoded);

        // Find user by ID
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid user' });
        }

        // Attach ONLY userId to request
        req.user = { userId: user._id.toString() };

        console.log("✅ User attached to req.user:", req.user); // Debugging

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
