const Subscription = require('../models/subscription.model');

async function saveSubscription({ userId, endpoint, keys }) {
  const existing = await Subscription.findOne({ userId, endpoint });
  if (existing) {
    existing.keys = keys;
    await existing.save();
    return existing._id;
  }

  const sub = new Subscription({ userId, endpoint, keys });
  await sub.save();
  return sub._id;
}

async function deleteSubscription({ userId, endpoint }) {
  await Subscription.deleteOne({ userId, endpoint });
}

async function deleteSubscriptionByEndpoint(endpoint) {
  await Subscription.deleteMany({ endpoint });
}

async function getSubscriptionsByUserId(userId) {
  return Subscription.find({ userId }).lean();
}

module.exports = {
  saveSubscription,
  deleteSubscription,
  deleteSubscriptionByEndpoint,
  getSubscriptionsByUserId,
};