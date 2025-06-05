const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema(
    {
        historyId: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: true },
        provinsi: { type: String, required: true },
        jenisKelamin: { type: String, required: true },
        usiaBayiBulan: { type: Number, required: true },
        bbLahir: { type: Number, required: true },
        tbLahir: { type: Number, required: true },
        asiEksklusifBulan: { type: Number, required: true },
        lingkarKepala: { type: Number, required: true },
        lahirPrematur: { type: String, required: true },
        usiaIbu: { type: Number, required: true },
        tinggiIbu: { type: Number, required: true },
        bmiIbu: { type: Number, required: true },
        pendidikanIbu: { type: String, required: true },
        sanitasiLayak: { type: String, required: true },
        airMinumLayak: { type: String, required: true },
        statusImunisasi: { type: String, required: true },
        stuntingRisk: { type: String, required: true },
        rekomendasi: [{ type: String, default: [] }],
        nutrisi: [{ type: String, default: [] }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Prediction', predictionSchema);