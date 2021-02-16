module.exports = server => {
    const user = require('../controllers/user');

    server.post('/user', user.create);
    server.get('/user', user.findAll);
    server.delete('/user/:userId', user.delete);
    server.put("/user/:userId", user.update);
};
