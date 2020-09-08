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
    })
})
module.exports = router