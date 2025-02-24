require('dotenv').config();

const express = require('express');
const mongoose = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const subscriptionRoutes = require('./routes/subscriptionRoutes.js');
const contentRoutes = require('./routes/contentRoutes.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/content', contentRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).json({
      message: "Hello from root!",
    });
  });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
