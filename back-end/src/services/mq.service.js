const mq = require('../utils/mq');

const sendMessage = async (queue, message) => {
    await mq.publishToQueue(queue, message);
};

const receiveMessages = async (queue, handler) => {
    await mq.consumeFromQueue(queue, handler);
};

module.exports = {
    sendMessage,
    receiveMessages,
};
