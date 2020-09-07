const express = require('express')
const router = express.Router();
const fs = require("fs");
const { port,ip } = require('../../config')
const multer = require('multer');
const upload = multer()
router.post('/upload', upload.single('image'), (req, res) => {
    let filetype = req.query.type;
    // 获取名字
    let file_name = req.file.originalname
    // 获取后缀名
    file_name = file_name.replace(/.+\./, "");
    // 生成随机名字
    let randomName = Date.now();
    // 拼接文件名字
    let fileName = randomName + "." + file_name;
    // 创建写入流
    let ws = fs.createWriteStream('./public/upload/' + fileName);
    // 写入buffer数据
    ws.write(req.file.buffer);
    ws.end(async function () {
        res.json({
            code: 200,
            msg: "上传成功",
            data: `${ip}:${port}/upload/` + fileName
        })
        // if (filetype == 1) {
        // let sql1 = `INSERT INTO files set ?`;
        // let data1 = { weburl: imgUrl + '/upload/' + fileName, ctime: Date.now(), filename: fileName }
        // conn.query(sql1, data1, (err, data) => {
        //     if (err) {
        //         res.json({
        //             code: 400,
        //             msg: "上传失败"
        //         })
        //     } else {
        //         res.json({
        //             data: { webPic: imgUrl + '/upload/' + fileName },
        //             code: 200,
        //             msg: "上传成功"
        //         })
        //     }
        // })

        // return;
        // }
        // //     oss仓库地址          要上传文件的地址
        // let result = await client.put('/files/' + fileName, './public/upload/' + fileName);
        // if (result.res.status != 200) {
        //     res.json({
        //         code: 400,
        //         msg: "上传失败"
        //     })
        // } else {
        //     let sql = `INSERT INTO files set ?`;
        //     let data = { weburl: imgUrl + '/upload/' + fileName, ctime: Date.now(), ossurl: result.url, filename: fileName };

        //     conn.query(sql, data, (err, data) => {
        //         if (err) {
        //             res.json({
        //                 code: 400,
        //                 msg: "上传失败"
        //             })
        //         } else {
        //             res.json({
        //                 data: { intPic: result.url, webPic: imgUrl + '/upload/' + fileName },
        //                 code: 200,
        //                 msg: "上传成功"
        //             })
        //         }
        //     })

        // }
    })
})
module.exports = router