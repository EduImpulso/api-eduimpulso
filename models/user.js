const Conn = require('../config/database');

const User = function (user) {
    this.name = user.name;
    this.username = user.username;
    this.born_date = user.born;
    this.email = user.email;
    this.password = user.password
}

User.getAll = result => {
    const sql = "SELECT * FROM usuarios";
    Conn.query(sql, (error, res) => {
        if (error){
            return error;
        } console.log("user: ", res);
        result(null, res);
    })
}

User.login = (email, password, result) => {
    const sql = `SELECT * FROM usuarios WHERE email=${email} AND password=${password}`;
    Conn.query(sql, (error, res) => {
        if (error){
            console.log("error", error);
            result(error, null);
            return
        } 
        if (res.length){
            console.log("found user", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: 'not_found'}, null)
    })
}

User.create = (newUser, result) => {
    const sql = "INSERT INTO usuarios SET ?";
    Conn.query(sql, newUser, (error, res) => {
        if (error){
            result(true, {error: "User don't registered"})
        } console.log("User registered: ");
        result(null, {id: res.insert_id, ...newUser});
    })
}

User.delete = (id, result) => {
    sql.query("DELETE FROM customers WHERE id_user = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };

User.update = (id, user, result) => {
    sql.query(
      "UPDATE user SET email = ?, name = ?, username = ? WHERE id_user = ?",
      [user.email, user.name, user.username, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
};
  

module.exports = User;
