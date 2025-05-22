const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    predId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prediction', required: true },
    riskLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
    foods: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
