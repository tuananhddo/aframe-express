var mysql = require('mysql')
var connectConfig = require('./db.config')
// var connection = mysql.createConnection({
//     host: connectConfig.host,
//     user: connectConfig.user,
//     password: connectConfig.password,
//     database: connectConfig.database,
//     connectTimeout: 1000000
// })
var pool = mysql.createPool({
    connectionLimit: 10,
    host: connectConfig.host,
    user: connectConfig.user,
    password: connectConfig.password,
    database: connectConfig.database,
    connectTimeout: 1000000
});
// connection.connect(function (err) {
//     if (err) return new Error('ERR');
//     console.log("Connected!!!")
// })
module.exports = pool;
