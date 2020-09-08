const express = require('express')
const router = express.Router();
const conn = require('../../db');
const { secret } = require('../../config')
const jwt = require('jsonwebtoken')
router.use((req, res, next) => {
    let token = req.headers.authorization; // 获取token
    try {
        let decoded = jwt.verify(token, secret)    // 解析
        req.userInfo = decoded   // 将解析的数据放到req上面
        next()
    } catch (err) {   // 解析错误就返回400
        res.json({
            code: 2003,
            msg: "TOKEN ERROR"
        })
    }
})

// 添加文章
router.post('/blog', (req, res) => {
    let content = req.body.content;
    let html = req.body.html;
    let title = req.body.title;
    let ctime = Date.now();
    let status = req.body.status;
    let sql = `INSERT INTO blog set ?`;
    let data = { content, html, ctime, status, title }
    conn.query(sql, data, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "上传失败",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "上传成功"
            })
        }
    })
})
// 需改文章
router.put('/blog', (req, res) => {
    let content = req.body.content;
    let id = req.body.id;
    let html = req.body.html;
    let title = req.body.title;
    let ctime = Date.now();
    let status = req.body.status;
    let sql = `UPDATE blog set ? where id = ${id}`;
    let data = { content, html, ctime, status, title }
    conn.query(sql, data, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "数据库错误",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "修改成功"
            })
        }
    })
})

// 获取文章  分页
router.get('/blog/:pageNum/:pageSize', (req, res) => {
    let status = req.query.status;
    let search = req.query.search;
    let pageNum = req.params.pageNum
    let pageSize = req.params.pageSize
    if (!pageNum || !pageSize) {
        res.json({
            code: 400,
            msg: "无效数据"
        })
        return;
    }
    let sql = `select id,title,content,ctime,html,status from blog where ${status} like '%${search}%'  limit ${(pageNum - 1) * pageSize} , ${pageSize};select count(*) total  from blog`
    conn.query(sql, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "数据库异常",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "成功",
                data: {
                    data: data[0],
                    total: data[1][0].total
                }
            })
        }
    })
})
//  获取文章   单个
router.get('/blog/:id', (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.json({
            code: 400,
            msg: "无效数据"
        })
        return;
    }
    let sql = `select id,title,content,ctime,html,status from blog where id = ${id}`
    conn.query(sql, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "数据库异常",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "成功",
                data: data[0]
            })
        }
    })
})


// 路由
router.get('/routers', (req, res) => {
    let sql = `select * from routers`;
    conn.query(sql, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "服务器错误！！！"
            })
        } else {
            res.json({
                code: 200,
                msg: "获取成功",
                data
            })
        }
    })
})
router.put('/routers', (req, res) => {
    let sql = `UPDATE routers SET ? WHERE id =${req.body.id}`;
    let key = req.body.key;
    let value = req.body.value;
    let data = {}
    data[key] = value

    conn.query(sql, data, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "服务器错误！！！",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "修改成功！"
            })
        }
    })
})
router.delete('/routers/:id', (req, res) => {
    let id = req.params.id;
    let sql = `delete from routers where id = ${id}`;
    conn.query(sql, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "服务器错误！！！"
            })
        } else {
            res.json({
                code: 200,
                msg: "删除成功！"
            })
        }
    })
})

router.post('/routers', (req, res) => {
    let routerName = req.body.routerName;
    let routerPath = req.body.routerPath;
    let sql = `insert into routers (routerName,routerPath) values(?,?)`;
    conn.query(sql, [routerName, routerPath], (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "服务器错误！！！"
            })
        } else {
            res.json({
                code: 200,
                msg: "添加成功！"
            })
        }
    })
})


//#region 站点

router.get('/seting', (req, res) => {
    let sql = `select title,subtitle,footer from setting where id = 1`;
    conn.query(sql, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "服务器错误！！！"
            })
        } else {
            res.json({
                code: 200,
                msg: "获取成功",
                data: data[0]
            })
        }
    })
})
router.put('/seting', (req, res) => {
    let sql = `UPDATE setting SET ? WHERE id = 1`;
    conn.query(sql, req.body, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "服务器错误！！！",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "修改成功",
                data:true
            })
        }
    })
})

router.put('/seting/footer', (req, res) => {
    let sql = `UPDATE setting SET ? WHERE id = 1`;
    conn.query(sql, req.body, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "服务器错误！！！",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "修改成功",
                data:true
            })
        }
    })
})

//#endregion

module.exports = router