const express = require("express")
const router = express.Router();
const db = require("../db")
const request = require('request');
const dbName = "blogBody"
router.get("/zy", (req, res) => {
    let sql = `select title,ctime,id from ${dbName}`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        res.render('zy', {
            data: data
        })

    })
})
router.get("/art", (req, res) => {
    let sql = `select * from ${dbName} where id = ?`;
    // db.query(sql, 4, (err, data) => {
    //     if (err) return console.log(err);
    //     // console.log(data[0]);
    //     res.render('article', {
    //         data: data[0]
    //     })
    // })
    // console.log(req.params);

    res.render('article')
})
router.get("/blog/:id", (req, res) => {
    let id = req.params.id
    let sql = `select * from ${dbName} where id = ?`;
    db.query(sql, id, (err, data) => {
        if (err) return console.log(err);
        res.json({
            data: data[0]
        })
    })
})

router.get("/wnl", (req, res) => {
    request('https://www.sojson.com/open/api/lunar/json.shtml', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the baidu homepage.
        } else {
            console.log(response, body);

        }
    })
})

module.exports = router;