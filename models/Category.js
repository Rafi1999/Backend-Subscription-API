const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: String,
    sampleArticles: [String]
});
module.exports = mongoose.model('Category', CategorySchema);