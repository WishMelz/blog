const express = require('express')
const router = express.Router();
const conn = require('../db');
const  config = require('../config')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
router.post('/login',(req,res)=>{
    let sql = `select * from user where username ='${req.body.username}' and psd = '${md5(req.body.password + config.secret)}'`;
    conn.query(sql, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "数据库错误！！！",
                err
            })
        } else {
            if (data.length != 0) {
                let token = jwt.sign({ ...data[0] }, config.secret, { expiresIn: 60 * 60 * 3 })
                res.json({
                    code: 2001,
                    msg: "登录成功！！！",
                    data:{token}
                })
            } else {
                res.json({
                    code: 2002,
                    msg: "登录失败，密码错误",
                })
            }
        }
    })
})

module.exports = router