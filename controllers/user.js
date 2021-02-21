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
        email: req.body.email,
        password: req.body.password
    })

    User.findByEmail(user.email, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          User.create(user, (error, results) => {
            if(error){
              console.log(error)  
              res.status(406).send(error)
            } res.status(200).send(results);
          })
        } else {
          res.status(500).send({
            message: "Error retrieving user " + req.params.customerId
          });
        }
      } else {
        res.status(406).send(data)
      };
    });
}

exports.findAll = (req, res) => {
    User.getAll((error, results) => {
        if(error){
            res.send(error);
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
            if(error.kind === 'not_found'){
                res.status(404).send({
                    message: `Invalid email or password. Try again`
                });
            } else {
                res.status(500).send({
                    message: `User not found`
                })
            }
        } else {
          console.log(results)
          res.send(results);
        }
    })
}

exports.findOne = (req, res) => {
  User.findByEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
    User.delete(req.params.email, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.email
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
}

exports.update = (req, res) => {
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
