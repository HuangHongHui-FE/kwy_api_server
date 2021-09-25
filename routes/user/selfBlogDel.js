const express = require("express")


var ObjectID = require('mongodb').ObjectId;

var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShiUpdate = require("../../util/dataGeShiUpdate.js")


router.delete("/user/selfBlogDel", async (req, res)=>{
	let params = req.query
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('blogs').deleteOne({_id: ObjectID(params._id)})
		data = await dataGeShiUpdate(data)
		res.send(data)
        client.close()
	} catch(err) {
		res.send("错误" + err)
        client.close()
	}
})

module.exports = router