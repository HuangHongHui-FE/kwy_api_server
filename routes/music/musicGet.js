const express = require("express")

var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")

router.get("/musicGet", async (req, res)=>{
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('music').find({}).toArray()
		data = await dataGeShi(data)
		res.send(data)
		client.close()
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})

module.exports = router