const express = require("express");

var router = express.Router()

const client = require("../../util/dbconfig.js")
// 改data数据格式
const dataGeShi = require("../../util/dataGeShi.js")

const app=express()
var cookieParser = require('cookie-parser'); 
app.use(cookieParser()); 

async function grzlFd(client, req, res){
	try {
		await client.connect();
		console.log("数据库连接成功！")
		let db = client.db("funguy")
		let data = await db.collection('jianjie').find().toArray()

		data = await dataGeShi(data)

		res.cookie("name",'zhangsan',{maxAge: 9000000}); 
		
		res.send(data)
		client.close()
		
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
}

router.get("/kwy/grzl", (req, res)=>{
	grzlFd(client, req, res);
})


module.exports = router