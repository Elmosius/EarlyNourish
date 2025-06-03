const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema(
    {
        historyId: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: true },
        jenisKelamin: { type: String, enum: ['pria', 'wanita'], required: true },
        usia: { type: Number, required: true }, 
        bbLahir: { type: Number, required: true }, 
        tbLahir: { type: Number, required: true },
        beratBadan: { type: Number, required: true }, 
        tinggiBadan: { type: Number, required: true }, 
        stuntingRisk: { type: String, enum: ['low', 'medium', 'high'], required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Prediction', predictionSchema);
