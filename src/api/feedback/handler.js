const FeedbackValidator = require('../../validator/feedback');
const feedbackService = require('../../services/feedback.service');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');
const mongoose = require('mongoose');

const getAllFeedbackHandler = async (request, h) => {
  try {
    const result = await feedbackService.getAllFeedback();
    return h.response({ Error: false, Message: 'success', feedback: result }).code(200);
  } catch (err) {
    return h.response({ Error: true, Message: 'Gagal mengambil feedback' }).code(500);
  }
};

const getFeedbackByUserHandler = async (request, h) => {
  try {
    const { userId } = request.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new InvariantError('User ID tidak valid');
    }

    const feedback = await feedbackService.getFeedbackByUser(userId);
    if (!feedback) throw new NotFoundError('Feedback tidak ditemukan');

    return h.response({
      Error: false,
      Message: 'success',
      feedback,
    }).code(200);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    return h.response({ Error: true, Message: 'Gagal mengambil feedback' }).code(500);
  }
};

const createFeedbackHandler = async (request, h) => {
  try {
    const { userId } = request.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new InvariantError('User ID tidak valid');
    }

    FeedbackValidator.validatePostFeedbackPayload(request.payload);
    const created = await feedbackService.createFeedback(userId, request.payload);

    if (!created) throw new NotFoundError('User tidak ditemukan');

    return h.response({ Error: false, Message: 'success' }).code(200);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    return h.response({ Error: true, Message: 'Gagal menyimpan feedback' }).code(500);
  }
};

module.exports = {
  getAllFeedbackHandler,
  getFeedbackByUserHandler,
  createFeedbackHandler,
};