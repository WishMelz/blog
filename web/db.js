const mysql = require('mysql')
const { db } = require('./config')
    // 配置数据库账号、密码
const connection = mysql.createConnection(db)
    // 连接数据库
connection.connect()
    // 导出 connection
module.exports = connection