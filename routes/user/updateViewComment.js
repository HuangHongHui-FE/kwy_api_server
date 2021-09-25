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


// 发表评论后，评论列表的更新
router.post("/user/updateComment", async (req, res) => {
    //获取表单传过来的数据
    // console.log(req.body)
    let _id = req.body._id
    let comment = req.body.comment
    try {
        await client.connect();
        let db = client.db("funguy")
        // 先查出来原来的评论，合并进去现在的，再更新
        data = await db.collection('blogs').updateOne({_id: ObjectID(_id)}, {$push: {comments: comment}})
        data = dataGeShiUpdate(data)
        res.send(data)

    } catch(err) {
        res.send("错误" + err)
    } finally {
        client.close()
    }
})


// 点击进入博客详情时，views的更新
router.post("/user/updateView", async (req, res) => {
    //获取表单传过来的数据
    console.log(req.body)
    let _id = req.body._id
    try {
        await client.connect();
        let db = client.db("funguy")
        let data = await db.collection('blogs').updateOne({_id: ObjectID(_id)}, {$inc: {views: 1}})
        // console.log(data)
        // data = dataGeShiUpdate(data)
        // res.send(data)

    } catch(err) {
        res.send("错误" + err)
    } finally {
        client.close()
    }
})

module.exports = router