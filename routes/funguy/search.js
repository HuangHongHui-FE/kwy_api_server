const express = require("express")
var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")


router.get("/kwy/tpq/search", async (req, res)=>{
    let params = req.query
    console.log(params)
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('imageSum').find({"title": {$regex: params.keyWords}}).skip(30 * parseInt(params.page)).limit(30).toArray()
        console.log(data)

		let resdata = dataGeShi(data)
		res.send(resdata)
	} catch(err) {
		res.send("错误" + err)
	} finally {
		client.close()
	}
})

module.exports = router