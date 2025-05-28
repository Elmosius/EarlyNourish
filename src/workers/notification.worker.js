const mqService = require('../services/mq.service');

const processNotification = async (notif) => {
    console.log('Processing notification:', notif);
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
};

const startWorker = async () => {
    await mqService.receiveMessages('notifications', processNotification);
    console.log('Notification worker started and listening to queue...');
};

startWorker().catch(console.error);
