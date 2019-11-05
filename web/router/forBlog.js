const express = require("express")
const router = express.Router();
const db = require("../db");
const dayjs = require("dayjs")
const dbName = "blogBody"
router.post("/forBlog", (req, res) => {
    let sql = `insert into ${dbName} values(null,?,?,?)`;
    let data = [
        req.body.title,
        req.body.cont,
        dayjs().format('YYYY-MM-DD HH:mm:ss')
    ]
    db.query(sql, data, (err, rest) => {
        if (err) {
            res.json({
                coed: "400",
                msg: "错误"
            })
            return
        } else {
            res.json({
                code: 200,
                msg: "发布成功"
            })

        }
    })
})

module.exports = router;