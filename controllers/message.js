const Message = require('../models/message');

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }

    const message = new Message({
        name: req.body.name,
        msg: req.body.msg,
        assunto: req.body.assunto,
        email: req.body.email
    })

    Message.create(message, (error, results) => {
        if(error){
            res.send(results)
        } res.send(results);
    })
}

exports.findAll = (req, res) => {
    Message.getAll((error, results) => {
        if(error){
            return error;
        } res.send(results);
    })
}
