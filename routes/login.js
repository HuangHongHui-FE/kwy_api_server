const express = require("express")

// const app=express()
var router = express.Router()

// var cookieParser = require('cookie-parser'); 
// app.use(cookieParser());

const client = require("../util/dbconfig.js")
const dataGeShi = require("../util/dataGeShi.js")



router.post("/login", async (req, res)=>{
	
	var body = req.body
	console.log(body)

	try {
		await client.connect();
		console.log("login数据库连接成功！")
		let db = client.db("funguy")
		let data = await db.collection('login').find({username: body.username, pwd: body.pwd}).toArray()
		data = await dataGeShi(data)
		// console.log(data.meta.status == 200)
		// if(data.meta.status == 200){
		// 	res.cookie('username', "admin")
		// }
		res.send(data)
	} catch(err) {
		res.send("错误" + err)
	} finally {
		client.close()
	}
})

module.exports = router