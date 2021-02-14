const mysql = require('mysql');

const Connection = mysql.createConnection({
    host: process.env.EDU_HOST,
    user: process.env.EDU_USER,
    password: process.env.EDU_PASSWORD,
    database: process.env.EDU_DATABASE
})

module.exports = Connection;
