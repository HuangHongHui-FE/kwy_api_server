const express = require("express")

var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")

const app=express()
var cookieParser = require('cookie-parser'); 
app.use(cookieParser()); 

router.get("/user/grzl", async (req, res)=>{
	let params = req.query

	try {
		await client.connect();
		// console.log("user数据库连接成功！")
		let db = client.db("funguy")
		let data = await db.collection('user').findOne({username: params.username, pwd: params.pwd})
		data = await dataGeShi(data)
		res.cookie("username","HHH",{maxAge:1000*60*60})
		res.send(data)
		client.close()
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})

module.exports = router