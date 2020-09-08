module.exports = {
    port: 1234,    // 端口
    ip: 'http://127.0.0.1',   // 服务器的ip，主要是图片路劲的路劲
    secret: '20200901..',   // 秘钥，登录加密和token的加密。如果修改，登录密码也会改变
    db: {
        host: '',
        port: '',
        user: '',
        password: '',
        database: '',
        multipleStatements: true
    },
}