const express = require("express")
var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")
const fs= require("fs")


router.get("/touXiangGet", async (req, res)=>{
	let params = req.query
	try {
		await client.connect();
		var data = await client.db("funguy").collection('touXiang').findOne({username: params.username, pwd: params.pwd})
        if(data){
            fs.readFile(data.touxiang, function (err, data1) {
                if (err) {
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    res.end("文件读取失败，请稍后重试！")
                    client.close()
                } else {
                    res.setHeader('Content-Type', 'image/*')
                    data1 = data1.toString('base64')
                    data1 = dataGeShi(data1)
                    res.send(data1)
                    client.close()
                }
            })
        }else{
            // 没有此用户
            data = dataGeShi([])
            res.send(data)
            client.close()
        }
		
	} catch(err) {
		res.send("错误" + err)
        client.close()
	}
})
module.exports = router






