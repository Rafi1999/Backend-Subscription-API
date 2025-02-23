const axios = require('axios');
const User = require('../models/User');

exports.getPersonalizedContent = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        console.log("User Data:", user);  // Debugging

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        console.log("User Subscriptions:", user.subscribedCategories); // Debugging

        if (!user.subscribedCategories || user.subscribedCategories.length === 0) {
            return res.status(400).json({ error: 'No subscriptions found' });
        }

        const API_URL = `https://newsapi.org/v2/top-headlines?category=${user.subscribedCategories.join(',')}&apiKey=${process.env.NEWS_API_KEY}`;

        const response = await axios.get(API_URL);
        
        res.json({ articles: response.data.articles });

    } catch (error) {
        console.error("Error Fetching Content:", error.message); // Debugging
        res.status(500).json({ error: error.message });
    }
};
