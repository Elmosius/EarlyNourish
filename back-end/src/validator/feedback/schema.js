const Joi = require('joi');

const PostFeedbackPayloadSchema = Joi.object({
  rating: Joi.number().integer().min(0).max(5).required(), 
  description: Joi.string().optional().allow(''),
});

module.exports = {
  PostFeedbackPayloadSchema,
};