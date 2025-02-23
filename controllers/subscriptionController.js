const User = require('../models/User');
const sendEmail = require('../config/emailService');

exports.subscribe = async (req, res) => {
    try {
        console.log("🔹 req.user:", req.user); // Debugging
        console.log("🔹 Decoded User ID from authMiddleware:", req.user?.userId); // Debugging

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: "Unauthorized: User data missing" });
        }

        const user = await User.findById(req.user.userId);

        if (!user) {
            console.log("❌ User NOT found in DB for ID:", req.user.userId); // Debugging
            return res.status(404).json({ error: "User not found" });
        }

        console.log("✅ User found in DB:", user); // Debugging

        user.subscribedCategories = req.body.categories || [];
        await user.save();

        await sendEmail(
            user.email,
            'Subscription Confirmation',
            `You have subscribed to ${user.subscribedCategories.join(', ')}`
        );

        res.json({ message: 'Subscribed successfully', user });
    } catch (error) {
        console.error("Subscription Error:", error);
        res.status(500).json({ error: error.message });
    }
};
