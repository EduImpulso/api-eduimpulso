const Course = require('../models/courses');

exports.findAll = (req, res) => {
    Couse.getAll((error, result) => {
        if (error) {
            return error;
        } res.send(result);
    })
}
