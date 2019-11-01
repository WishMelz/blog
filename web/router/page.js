const express = require("express")
const router = express.Router();
const db = require("../db")
const dbName = "blogBody"
router.get("/zy", (req, res) => {
    let sql = `select title,ctime from ${dbName}`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        res.render('zy', {
            data: data
        })

    })
})
router.get("/art", (req, res) => {
    let sql = `select * from ${dbName} where id = ?`;
    db.query(sql, 4, (err, data) => {
        if (err) return console.log(err);
        // console.log(data[0]);
        res.render('article', {
            data: data[0]
        })
    })

})
module.exports = router;