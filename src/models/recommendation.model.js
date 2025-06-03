const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema(
  {
    historyId: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: true },
    makanan: { type: [String], default: [] },
    tindakan: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recommendation', recommendationSchema);
