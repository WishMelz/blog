const express = require("express")
const router = express.Router();
const crypto = require('crypto');
const db = require("../db")
const dbName = "blogUser";
// 登录
router.post("/login", (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        const use = crypto.createHmac('sha256', username)
            .update('WishMeLzzZ')
            .digest('hex');
        const pwd = crypto.createHmac('sha256', password)
            .update('WishMeLzzZ')
            .digest('hex');
        let sql = `select * from ${dbName} where username=? and password=?`;
        // window.sessionStorage.set("s", "123")
        db.query(sql, [use, pwd], (err, data) => {
            if (err) {
                res.json({
                    coed: "400",
                    msg: "服务器错误"
                })
                return
            }
            if (data.length == 0) {
                res.json({
                    coed: "400",
                    msg: "错误"
                })
                return
            }
            res.json({
                coed: "200",
                token: "dasd"
            })
        })
    })
    // 获取标题
router.get("/adminTitle", (req, res) => {
        let sqlName = "headline";
        let sql = `select * from ${sqlName}`;
        db.query(sql, (err, data) => {
            if (err) {
                res.json({
                    coed: "400",
                    msg: "错误"
                })
                return
            }
            res.json({
                code: 200,
                data: data[0]
            })
        })
    })
    // 修改标题
router.put("/adminTitle", (req, res) => {
        let sqlName = "headline";
        let sql = `update  ${sqlName} set titleName=?,smallName=? where id = 1`;
        db.query(sql, [req.body.titleName, req.body.smallName], (err, data) => {
            if (err) {
                res.json({
                    coed: "400",
                    msg: "错误"
                })
                return
            }
            res.json({
                code: 200,
                msg: "修改成功"
            })
        })
    })
    // 获取导航栏
router.get('/adminNav', (req, res) => {
        let sql = `select * from nav`;
        db.query(sql, (err, data) => {
            if (err) {
                res.json({
                    coed: "400",
                    msg: "错误"
                })
                return
            }
            res.json({
                code: 200,
                data: data
            })
        })
    })
    // 修改导航栏
router.put('/adminNav/:id', (req, res) => {
        let data = [
            req.body.navName,
            req.body.navLink,
            req.params.id
        ]
        let sql = `update nav set navName=?,navLink=? where id = ?`;
        db.query(sql, data, (err, data) => {
            if (err) {
                res.json({
                    coed: "400",
                    msg: "错误"
                })
                return
            }
            res.json({
                code: 200,
                msg: "修改成功"
            })
        })
    })
    // 添加导航
router.post('/adminNav', (req, res) => {
        let data = [
            req.body.navName,
            req.body.navLink,
        ]
        let sql = `insert into nav values(null,?,?)`;
        db.query(sql, data, (err, data) => {

            if (err) {
                res.json({
                    code: "400",
                    msg: "错误"
                })
                return
            }
            res.json({
                code: 200,
                msg: "添加成功"
            })
        })
    })
    // 删除导航
router.delete('/adminNav/:id', (req, res) => {
        let sql = `delete from nav where id = ?`;
        db.query(sql, req.params.id, (err, data) => {
            if (err) {
                res.json({
                    code: "400",
                    msg: "错误"
                })
                return
            }
            res.json({
                code: 200,
                msg: "删除成功"
            })
        })
    })
    // 获取所有文章
router.get("/adminWz", (req, res) => {
        let sql = `select * from blogBody`;
        db.query(sql, (err, data) => {
            if (err) {
                res.json({
                    coed: "400",
                    msg: "错误"
                })
                return
            }
            res.json({
                code: 200,
                data: data
            })
        })
    })
    // 根据id湖区文章
router.get("/adminWz/:id", (req, res) => {
        let sql = `select * from blogBody where id = ?`;
        db.query(sql, req.params.id, (err, data) => {
            if (err) {
                res.json({
                    coed: "400",
                    msg: "错误"
                })
                return
            }
            res.json({
                code: 200,
                data: data[0]
            })
        })
    })
    // 删除文章
router.delete('/adminDelWz/:id', (req, res) => {
        let sql = `delete from blogBody where id = ?`;
        db.query(sql, req.params.id, (err, data) => {
            if (err) {
                res.json({
                    coed: "400",
                    msg: "错误"
                })
                return
            }
            res.json({
                code: 200,
                msg: "删除成功"
            })
        })

    })
    // 修改
router.put('/adminWz/:id', (req, res) => {
    let sql = `update  blogBody set title=?,cont=? where id = ?`;
    // return
    db.query(sql, [req.body.title, req.body.cont, req.params.id], (err, data) => {
        if (err) {
            res.json({
                coed: "400",
                msg: "错误"
            })
            return
        }
        res.json({
            code: 200,
            msg: "修改成功"
        })
    })
})

router.get('/adminFoot', (req, res) => {
    let sql = `select * from footline`;
    db.query(sql, (err, data) => {
        if (err) {
            res.json({
                coed: "400",
                msg: "错误"
            })
            return
        }
        res.json({
            code: 200,
            data: data[0]
        })
    })
})
router.put('/adminFoot', (req, res) => {
    let sql = `update footline set footerName=?`;
    db.query(sql, req.body.footerName, (err, data) => {
        if (err) {
            res.json({
                coed: "400",
                msg: "错误"
            })
            return
        }
        res.json({
            code: 200,
            msg: "修改成功"
        })
    })
})
module.exports = router