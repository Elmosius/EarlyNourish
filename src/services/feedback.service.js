const Feedback = require('../models/feedback.model');
const User = require('../models/user.model');

const getAllFeedback = async () => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 }).populate('userId', 'namaLengkap');
  return feedbacks.map((f) => ({
    id: f._id,
    namaLengkap: f.userId?.namaLengkap ?? null,
    rating: f.rating,
    description: f.description,
    createdAt: f.createdAt,
  }));
};

const createFeedback = async (userId, payload) => {
  const user = await User.findById(userId);
  if (!user) return null;

  const feedback = new Feedback({ userId, ...payload });
  await feedback.save();
  return feedback;
};

module.exports = {
  getAllFeedback,
  createFeedback,
};
