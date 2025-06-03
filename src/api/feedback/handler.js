const Feedback = require('../../models/feedback.model');
const mongoose = require('mongoose');
const FeedbackValidator = require('../../validator/feedback');
const InvariantError = require('../../exceptions/InvariantError');
const ClientError = require('../../exceptions/ClientError');

const getAllFeedbackHandlerImpl = async (request, h) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  return h.response({
    Error: false,
    Message: 'success',
    feedback: feedbacks,
  }).code(200);
};

const getAllFeedbackHandler = async (request, h) => {
  try {
    return await getAllFeedbackHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal mengambil feedback' }).code(500);
  }
};

const createFeedbackHandlerImpl = async (request, h) => {
  const { userId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new InvariantError('User ID tidak valid');
  }

  FeedbackValidator.validatePostFeedbackPayload(request.payload);

  const { rating, description } = request.payload;
  const feedback = new Feedback({ rating, description });
  await feedback.save();

  return h.response({
    Error: false,
    Message: 'success',
  }).code(200);
};

const createFeedbackHandler = async (request, h) => {
  try {
    return await createFeedbackHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal menyimpan feedback' }).code(500);
  }
};

module.exports = {
  getAllFeedbackHandler,
  createFeedbackHandler,
};