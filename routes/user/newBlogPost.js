const express = require("express");
// const touXiang = require("../../util/touXiangTool.js");
const bodyParser = require('body-parser');
const app = express();

const client = require("../../util/dbconfig.js")

var router = express.Router();

var ObjectID = require('mongodb').ObjectId;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const fs= require("fs");
const dataGeShiUpdate = require("../../util/dataGeShiUpdate.js");



router.post("/user/newBlogPost", async (req, res) => {
    //获取表单传过来的数据
    // let username = req.body
    console.log(req.body.value)
    let body = req.body
    try {
        await client.connect();
        let db = client.db("funguy")
        let data01 =  await db.collection('classify').find({name: body.value}).toArray()
        // 如果上传的为自定义的分类，就插入classify表里
        if(data01.length === 0){
            await db.collection('classify').insertOne({name: body.value})
        }

        if(body.isNew){
            let data = await db.collection('blogs').insertOne({username: body.username, file: body.file, inputTitle: body.inputTitle, html: body.html, markdown: body.markdown, views: body.views, comments: body.comments,value: body.value, isNew: false,time: Date.now()})
            data = dataGeShiUpdate(data)
            res.send(data)
        }else{
            let data = await db.collection('blogs').updateOne({username: body.username, _id: ObjectID(body._id)}, {$set: {file: body.file, inputTitle: body.inputTitle, html: body.html, markdown: body.markdown, views: body.views, comments: body.comments, value: body.value, isNew: false, time: Date.now()}})
            data = dataGeShiUpdate(data)
            res.send(data)
        }
        
    } catch(err) {
        res.send("错误" + err)
    } finally {
        client.close()
    }
})

module.exports = router