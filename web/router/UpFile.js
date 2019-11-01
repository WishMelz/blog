const express = require("express")
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const stringRandom = require('string-random');
const upload = multer()
const { osskey } = require("../config")
let OSS = require('ali-oss');
let client = new OSS(osskey);
router.post("/upfile", upload.single('photo'), (req, res) => {
    // 获取名字
    let file_name = req.file.originalname
        // 获取后缀名
    file_name = file_name.replace(/.+\./, "");
    // 生成随机名字
    let randomName = stringRandom(16);
    // 拼接文件名字
    let fileName = randomName + "." + file_name;
    // 创建写入流
    let ws = fs.createWriteStream('./public/upload/' + fileName);
    // 写入buffer数据
    ws.write(req.file.buffer);
    // 文件写入结束
    ws.end(async function() {
        //                                  oss仓库地址          要上传文件的地址
        let result = await client.put('/images/' + fileName, './public/upload/' + fileName);
        if (result.res.status != 200) {
            res.json({
                code: "400",
                msg: "上传失败"
            })
        } else {
            res.json({
                url: result.url,
                code: 200,
                msg: "上传成功"
            })
        }
    })

})

module.exports = router;