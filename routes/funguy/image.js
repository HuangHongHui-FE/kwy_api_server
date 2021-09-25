const express = require("express")
var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")
const fs= require("fs")


router.get("/kwy/tpq", async (req, res)=>{
    let params = req.query

	try {
		await client.connect();
		console.log("image数据库连接成功！")
		let db = client.db("funguy")
		let data = await db.collection('imageSum').find().skip(30 * parseInt(params.page)).limit(30).toArray()

		let resdata = dataGeShi(data)
		res.send(resdata)
	} catch(err) {
		res.send("错误" + err)
	} finally {
		client.close()
	}
})

module.exports = router