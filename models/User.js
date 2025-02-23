const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscribedCategories: { type: [String], default: [] } // ✅ Ensure it's an array
});

module.exports = mongoose.model("User", UserSchema);
