const express = require("express")

var router = express.Router()

var ObjectID = require('mongodb').ObjectId;

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")

const fs= require("fs")


router.get("/user/selfBlogGet", async (req, res)=>{
	let params = req.query
    let page = parseInt(params.currentPage)
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('blogs').find({username: params.username}).sort({time: -1}).skip(10 * page).limit(10).toArray()
		let total = await db.collection('blogs').find({username: params.username}).count()
        data.push({total: total})
        data = await dataGeShi(data)
		res.send(data)
        client.close()
	} catch(err) {
		res.send("错误" + err)
        client.close()
	}
})


// 根据id获取到blog详情页
router.get("/user/getBlogConById", async (req, res)=>{
	let _id = req.query._id
	try {
		await client.connect();
		let db = client.db("funguy")
		// 根据id获取到这一个博客详细信息
		let data_id = await db.collection('blogs').find({_id: ObjectID(_id)}).toArray()
		// console.log(data_id)
		let username = data_id[0].username

		// 按列显示，拿到博客主人所有博客列表
		let data_user_blog = await db.collection('blogs').find({username: username}).project({_id: 1, inputTitle: 1, file: 1, time: 1}).sort({time: -1}).toArray()

		// 博客主的昵称
		let data_nicheng = await db.collection('user').find({username: username}).project({nicheng: 1, _id: 0}).toArray()
		// console.log(data_nicheng)
		// 博客主人头像信息
		let data_user_img = await db.collection('touXiang').find({username: username}).project({touxiang: 1, _id: 0}).toArray()
		// console.log(data_user_img[0].touxiang)
		var data_image = ''
		await fs.readFile(data_user_img[0].touxiang, function (err, data_img) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end("文件读取失败，请稍后重试！")
                client.close()
            } else {
                data_image = data_img.toString('base64')
				let data = data_id.concat([{data_image:data_image}])
				data = data.concat(data_nicheng)
				data = data.concat(data_user_blog)

                data = dataGeShi(data)
                res.send(data)
				client.close()
            }
        })
        
	} catch(err) {
		res.send("错误" + err)
        client.close()
	}
})


// 单纯根据_id获取到博客markdown
router.get("/user/getBlogById", async (req, res)=>{
	let _id = req.query._id
	// console.log(id)
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('blogs').find({_id: ObjectID(_id)}).toArray()
        data = await dataGeShi(data)
		res.send(data)
        client.close()
	} catch(err) {
		res.send("错误" + err)
        client.close()
	}
})



module.exports = router
