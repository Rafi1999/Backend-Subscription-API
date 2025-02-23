const User = require('../models/User');

exports.unsubscribe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.subscribedCategories = user.subscribedCategories.filter(
            category => !req.body.categories.includes(category)
        );
        await user.save();

        res.json({ message: 'Unsubscribed successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
