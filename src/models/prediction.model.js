const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema(
    {
        historyId: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: true },
        jenisKelamin: { type: String, required: true },
        usia: { type: Number, required: true }, 
        bbLahir: { type: Number, required: true },
        tbLahir: { type: Number, required: true },
        bb: { type: Number, required: true },
        tb: { type: Number, required: true },
        risikoStunting: { type: String, required: true }, 
        rekomendasi: [{ type: String, default: [] }],
        nutrisi: [{ type: String, default: [] }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Prediction', predictionSchema);