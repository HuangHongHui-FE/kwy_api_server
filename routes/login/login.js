const express = require("express")

const app=express()
var router = express.Router()
const fs= require("fs")
var cookieParser = require('cookie-parser'); 
app.use(cookieParser());

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")

router.post("/login", async (req, res)=>{
	

	var body = req.body
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('touXiang').find({username: body.username, pwd: body.pwd}).toArray()

		// console.log(data) []
		if(data.length !== 0){
			fs.readFile(data[0].touxiang, function (err, data1) {
				if (err) {
					res.setHeader('Content-Type', 'text/plain; charset=utf-8')
					res.end("文件读取失败，请稍后重试！")
					client.close()
				} else {

					res.setHeader('Content-Type', 'image/*')
					data1 = data1.toString('base64')
					data1 = dataGeShi(data1)
					// res.setHeader('Set-Cookie', "name=" + JSON.stringify(body.username) + ";httpOnly; Secure; SameSite = None")
					// res.cookie('user', "hhh", {maxAge: 900000})  SameSite=Lax
					res.send(data1)
					client.close()
				}
			})
		}else{
			data = dataGeShi(data)
			res.send(data)
			client.close()
		}
		

		// data = await dataGeShi(data)
		// if(data.meta.status == 200){
		// 	res.cookie('username', "admin", {maxAge: 900000})
		// }
		// res.send(data)
	} catch(err) {
		res.send("错误" + err)
	} finally {
		client.close()
	}
})

module.exports = router