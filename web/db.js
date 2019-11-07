const mysql = require('mysql')
const { db } = require('./config')
    // 配置数据库账号、密码
    // const connection = mysql.createConnection(db)
const connection = mysql.createPool(db)
    // 连接数据库
    // connection.connect(function(err) {
    //         if (err) {
    //             console.log("出错了");

// connection.connect()
//         }
//     })
// 导出 connection
module.exports = connection