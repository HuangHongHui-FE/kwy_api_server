const express = require("express")

var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")


// 获取write博客选择的分类
router.get("/user/writeBlog/classify", async (req, res)=>{

	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('classify').find({}).toArray()
		data = await dataGeShi(data)
		// // res.cookie("username","HHH",{maxAge:1000*60*60})
		// res.setHeader('Cookie', ['c=333', 'd=444'])
        // console.log(data)
		res.send(data)
		client.close()
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})


// 分类博客数据的获取pc端
router.get("/share/classifyBlogGet", async (req, res)=>{
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('blogs').find({value: req.query.value}).skip(20 * (req.query.classifyPage - 1)).limit(20).sort({time: -1}).toArray()
		let total = await db.collection('blogs').find({value: req.query.value}).count()
		data = data.concat([{total: total}])
		data = dataGeShi(data)
		res.send(data)
		client.close()
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})

// 分类博客数据的获取手机端
router.get("/share/classifyBlogGetM", async (req, res)=>{
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('blogs').find({value: req.query.value}).skip(20 * req.query.classifyPage).limit(20).project({html: 0, markdown: 0, isNew: 0}).sort({time: -1}).toArray()
		data = dataGeShi(data)
		res.send(data)
		client.close()
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})


module.exports = router