module.exports = server => {
    const courses = require('../controllers/courses')

    server.get('/courses', courses.findAll);
};
