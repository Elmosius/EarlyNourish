const amqp = require('amqplib');

let connection = null;
let channel = null;

const connectMQ = async () => {
    if (channel) return channel;

    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();

    connection.on('close', () => {
        channel = null;
        connection = null;
        console.error('RabbitMQ connection closed');
    });

    connection.on('error', (err) => {
        console.error('RabbitMQ connection error', err);
    });

    return channel;
};

const publishToQueue = async (queueName, msg) => {
    const ch = await connectMQ();
    await ch.assertQueue(queueName, { durable: true });
    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)), { persistent: true });
};

const consumeFromQueue = async (queueName, callback) => {
    const ch = await connectMQ();
    await ch.assertQueue(queueName, { durable: true });
    ch.consume(queueName, async (msg) => {
        if (msg !== null) {
        try {
            const content = JSON.parse(msg.content.toString());
            await callback(content);
            ch.ack(msg);
        } catch (err) {
            console.error('Error processing message:', err);
            ch.nack(msg);
        }
        }
    });
};

module.exports = {
    connectMQ,
    publishToQueue,
    consumeFromQueue,
};
