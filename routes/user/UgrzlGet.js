const express = require("express")
var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")



router.get("/user/grzl", async (req, res)=>{

	let params = req.query

	try {
		await client.connect();
		console.log("login数据库连接成功！")
		let db = client.db("funguy")
		let data = await db.collection('login').findOne({username: params.username, pwd: params.pwd})
		data = await dataGeShi(data)

		res.send(data)
	} catch(err) {
		res.send("错误" + err)
	} finally {
		client.close()
	}
})

module.exports = router