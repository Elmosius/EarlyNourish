const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    rating: { type: Number, min: 0, max: 5, required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
