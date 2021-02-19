module.exports = server => {
    const user = require('../controllers/user');

    server.post('/user', user.create);
    server.get('/user', user.findAll);
    server.get('/user/:email', user.findOne);
    server.delete('/user/:email', user.delete);
    server.put("/user/:userId", user.update);
    server.post('/login', user.login);
};
