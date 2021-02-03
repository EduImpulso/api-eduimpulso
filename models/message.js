const Conn = require('../config/database');

const Message = function (message) {
    this.name_msg = message.name_msg;
    this.msg = message.msg;
}

Message.getAll = result => {
    const sql = "SELECT * FROM messages";
    Conn.query(sql, (error, res) => {
        if (error){
            return error;
        } console.log("messages: ", res);
        result(null, res);
    })
}

Message.create = (newMessages, result) => {
    const sql = "INSERT INTO messages SET ?";
    Conn.query(sql, newMessages, (error, res) => {
        if (error){
            result(true, {error: "Message not sent"})
        } console.log("Message sent: ");
        result(null, {id: res.insert_id, ...newMessages});
    })
}

module.exports = Message;
