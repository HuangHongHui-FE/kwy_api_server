const express = require("express")

var router = express.Router()


const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")

const fs= require("fs")


// const app=express()
// var cookieParser = require('cookie-parser'); 
// app.use(cookieParser()); 


// 返回所有inputTitle,做分享页Blogs的搜索框用了
router.get("/share/blogs/inputTitleGet", async (req, res)=>{
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('blogs').find({}).project({inputTitle: 1}).toArray()
        data = await dataGeShi(data)
        // console.log(data)

		// let name = req.cookies.name
		// console.log(name)
		res.send(data)
        client.close()
	} catch(err) {
		res.send("错误" + err)
        client.close()
	}
})

// 返回所有inputTitle,做分享页leonard的搜索框用了
router.get("/share/blogs/inputTitleGetLeonard", async (req, res)=>{
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('shareImage').find({}).project({inputTitle: 1}).toArray()
        data = await dataGeShi(data)
		res.send(data)
        client.close()
	} catch(err) {
		res.send("错误" + err)
        client.close()
	}
})



// 分页返回所有的blogs信息,以及分页功能的total,以及博客主的头像，昵称
router.get("/share/blogs/allBlogs", async (req, res)=>{
	let page = parseInt(req.query.currentPage)
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('blogs').find({}).sort({time: -1}).skip(page * 20).limit(20).toArray()
		let total = await db.collection('blogs').find({}).count()
		// let username = await db.collection('blogs').find({}).project({username: 1,_id: 0}).sort({time: -1}).skip(page * 20).limit(20).toArray()
		// console.log(username)
		data = data.concat([{total: total}])
        data = await dataGeShi(data)
		res.send(data)
        client.close()
	} catch(err) {
		res.send("错误" + err)
        client.close()
	}
})


// // share的Leonard页数据的返回
router.get("/share/leonard", async (req, res)=>{
	let page = parseInt(req.query.page)
	console.log(page)
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('shareImage').find({}).sort({_id: -1}).skip(page * 10).limit(10).toArray()
        data = await dataGeShi(data)
		res.send(data)
        client.close()
	} catch(err) {
		res.send("错误" + err)
        client.close()
	}
})



module.exports = router
