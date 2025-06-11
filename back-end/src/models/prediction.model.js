const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  historyId: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: true },
  jk: { type: String, required: true },
  bbLahir: { type: Number, required: true },
  tbLahir: { type: Number, required: true },
  umur: { type: Number, required: true },
  bb: { type: Number, required: true },
  tb: { type: Number, required: true },
  risikoStunting: { type: String, required: true },
  bbU: { type: Number, default: null },
  bbTb: { type: Number, default: null },
  tbU: { type: Number, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Prediction', predictionSchema);