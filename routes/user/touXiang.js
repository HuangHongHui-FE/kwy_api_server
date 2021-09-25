const express = require("express");
const touXiangTool = require("../../util/touXiangTool.js");
const bodyParser = require('body-parser');
const app = express();

const client = require("../../util/dbconfig.js")

const dataGeShiUpdate = require("../../util/dataGeShiUpdate.js");

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const fs= require("fs")


// 头像上传过来进行处理
router.post("/touXiang", touXiangTool.multer().single("pic"), async (req, res) => {
    //获取表单传过来的数据
    let username = req.body.username
    let touXiangPost = req.file.path

    // console.log(req.file)
    try {
        await client.connect();
        let db = client.db("funguy")
        // 删除原来的图片
        let oldData = await db.collection('touXiang').findOne({username: username})
        let oldTouXiang = oldData.touxiang
        console.log(oldData.touxiang)
        if(oldTouXiang && oldTouXiang != "static/kongbai.png"){
            fs.unlink(oldTouXiang, function(err){
                if(err){
                    console.log("err")
                }
            })
        }
        // 更新新的图片路径
        await db.collection('touXiang').updateOne({username: username}, {$set: {touxiang: touXiangPost}})
    } catch(err) {
        res.send("错误" + err)
    } finally {
        client.close()
    }
})


// 相册上传过来，进行处理
router.post("/user/uploadPhoto", touXiangTool.multerShare().array("multerShare", 6), async (req, res) => {
    // console.log(req.body.inputTitle)
    // console.log(req.body.username)
    // console.log(req.files)
    let filesList = []
    for(let i = 0; i < req.files.length; i++){
        filesList.push(req.files[i].path)
    }
    try {
        await client.connect();
        let db = client.db("funguy")
        let userdata = await db.collection("user").find({username: req.body.username}).project({nicheng: 1, grjj: 1}).toArray()

        // 更新新的图片路径
        let data = await db.collection('shareImage').insertOne({username: req.body.username, inputTitle: req.body.inputTitle, files: filesList, userdata: userdata})
        data = dataGeShiUpdate(data)
        // console.log(data)
        res.send(data)
    } catch(err) {
        res.send("错误" + err)
    }
})


module.exports = router