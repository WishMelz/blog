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
                console.log(err);

            } else {
                console.log("zzz");

            }
        })
        // console.log(req.body);

})

module.exports = router;