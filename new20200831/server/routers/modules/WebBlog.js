const express = require('express')
const router = express.Router();
const conn = require('../../db');
const request = require('request');
// 获取文章  分页
router.get('/blog/:pageNum/:pageSize', (req, res) => {
    let status = req.query.status || 'title';
    let search = req.query.search || '';
    let pageNum = req.params.pageNum
    let pageSize = req.params.pageSize
    if (!pageNum || !pageSize) {
        res.json({
            code: 400,
            msg: "无效数据"
        })
        return;
    }
    let sql = `select id,title,ctime from blog where status = 1 and ${status} like '%${search}%'  ORDER BY ctime desc limit ${(pageNum - 1) * pageSize} , ${pageSize};select count(*) total  from blog`
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
    let id = req.params.id - 0;
    if (!id || !(id * 1 == id)) {
        res.json({
            code: 2004,
            msg: "无效数据"
        })
        return;
    }
    let sql = `select title,ctime,html from blog where id = ${id}`
    conn.query(sql, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "数据库异常",
                err
            })
        } else {
            if (data.length == 0) {
                res.json({
                    code: 2004,
                    msg: "成功",
                    data: false
                })
            } else {
                res.json({
                    code: 200,
                    msg: "成功",
                    data: data[0]
                })
            }
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

router.get('/atps', (req, res) => {
    request('https://v2.jinrishici.com/one.json?client=browser-sdk/1.2&X-User-Token=TaBfUQVcCsJSlEv2Je%2Bs7JDiyUW2h6dA', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json({
                code: 200,
                msg: "请求成功",
                data: JSON.parse(body)
            })
        } else {
            res.json({
                code: "400",
                msg: "请求失败"
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
// router.put('/seting', (req, res) => {
//     let type = req.body.type;
//     let data = req.body.data;
//     console.log(req.body);
//     return
//     let sql = `select title,subtitle from setting where id = 1`;
//     conn.query(sql, (err, data) => {
//         if (err) {
//             res.json({
//                 code: 400,
//                 msg: "服务器错误！！！"
//             })
//         } else {
//             res.json({
//                 code: 200,
//                 msg: "获取成功",
//                 data
//             })
//         }
//     })
// })

//#endregion
module.exports = router