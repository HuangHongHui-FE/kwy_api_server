const express = require("express")

var router = express.Router()

var ObjectID = require('mongodb').ObjectId;

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")
const dataGeShiUpdate = require("../../util/dataGeShiUpdate.js");

router.get("/videoGet", async (req, res)=>{
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('videos').find({}).sort({love: -1}).toArray()
		data = await dataGeShi(data)
		res.send(data)
		client.close()
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})


// 评论增加
router.post("/videoCommentPush", async (req, res)=>{
    var body = req.body

    console.log(body)

	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('videos').updateOne({_id: ObjectID(body._id)}, {$push: {comments: body.commentInput}})
		// let data01 = await db.collection('videos').find({_id: ObjectID(body._id)}, {$push: {comments: body.commentInput}})
        // console.log(data)
        data = await dataGeShiUpdate(data)
		res.send(data)
		client.close()
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})

// love增加
router.post("/videoLovePush", async (req, res)=>{
    var body = req.body

	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('videos').updateOne({_id: ObjectID(body._id)}, {$inc: {love: 1}})
        data = await dataGeShiUpdate(data)
		res.send(data)
		client.close()
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})


// 点击评论icon查询这个_id的comment的评论数据以及love数据
router.get("/loveCommentGet", async (req, res)=>{
	// console.log(req.query)
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('videos').find({_id: ObjectID(req.query._id)}).project({love: 1, comments: 1}).toArray()
		data = await dataGeShi(data)
		res.send(data)
		client.close()
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})

module.exports = router