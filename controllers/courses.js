const Course = require('../models/courses');

exports.findAll = (req, res) => {
    Course.getAll((error, result) => {
        if (error) {
            return error;
        } res.send(result);
    })
}
