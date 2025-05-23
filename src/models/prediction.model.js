const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    age: { type: Number, required: true }, 
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    stuntingRisk: { type: String, enum: ['low', 'medium', 'high'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Prediction', predictionSchema);
