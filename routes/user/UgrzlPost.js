const express = require("express");
const bodyParser = require('body-parser');
const app = express();


var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShiUpdate = require("../../util/dataGeShiUpdate.js")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.post("/user/grzl", async (req, res)=>{

	let body = req.body
	// console.log(body)
	try {
		await client.connect();
		console.log("user数据库连接成功！")
		let db = client.db("funguy")
		let data = await db.collection('user').updateOne({username: body.username, pwd: body.pwd}, {$set: {"address": body.address, "nicheng": body.nicheng, "grjj": body.grjj, "sex": body.sex}})
		data = await dataGeShiUpdate(data)
		// console.log(data)
		res.send(data)
	} catch(err) {
		res.send("错误" + err)
	} finally {
		client.close()
	}
})


module.exports = router