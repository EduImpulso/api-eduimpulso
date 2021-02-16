const User = require('../models/user');

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            user: "Content can not be empty"
        })
    }

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        born_date: req.body.born,
        email: req.body.email,
        password: req.body.password
    })

    User.create(user, (error, results) => {
        if(error){
            res.send(results)
        } res.send(results);
    })
}

exports.findAll = (req, res) => {
    User.getAll((error, results) => {
        if(error){
            return error;
        } res.send(results);
    })
}

exports.login = (req, res) => {
    
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    User.login(user, (error, results) => {
        if(error){
            if(err.kin === 'not_found'){
                res.status(404).send({
                    message: `Invalid email or password. Try again`
                });
            } else {
                res.status(500).send({
                    message: `User not found`
                })
            }
        } else {
            res.send(results);
        }
    })
}

exports.delete = (req, res) => {
    User.delete(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.userId
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    User.update(
      req.params.userId,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.userId
            });
          }
        } else res.send(data);
      }
    );
  };
