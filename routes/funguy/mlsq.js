const express = require("express")
var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")
const fs= require("fs")


router.get("/kwy/tpq/mlsq", async (req, res)=>{

	function pReadFile(filePath) {
		return new Promise(function(resolve, reject){
			fs.readFile(filePath, function(err, data2){
				if(err){
					reject(err)
				}else{
					resolve(data2)
				}
			})
		})
	}

	try {
		await client.connect();
		console.log("image数据库连接成功！")
		let db = client.db("funguy")
		let data = await db.collection('image').find({"mask": "mlsq"}).toArray()
        console.log(data)
		const dataList = []
		for(let i = 0; i < data[0].mlsq.length; i++){
			// data[0].mlsq[i]      读到的文件名
			let path = "static/tpq/fenlei/" + data[0].mlsq[i]
			pReadFile(path).then(function(data2){
				// 将数据转换成base64
				data2 = data2.toString('base64')
				dataList.push({data: data2, title: data[0].mlsq[i]})
				if(i === data[0].mlsq.length - 1){
					res.setHeader('Content-Type', 'image/*')
					let resdata = dataGeShi(dataList)
					res.send(resdata)
				}
			})
		}
	} catch(err) {
		res.send("错误" + err)
	} finally {
		client.close()
	}
})

module.exports = router