module.exports = server => {
    const message = require('../controllers/message');

    server.post('/messages', message.create);
    server.get('/messages', message.findAll);
};
