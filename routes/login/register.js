const express = require("express")

const app=express()
var router = express.Router()

var cookieParser = require('cookie-parser'); 
app.use(cookieParser());

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")
const registerCity = require("../../util/registerCity.js")



router.post("/register", async (req, res)=>{
	
	var body = req.body
	// console.log(body)
  // 验证提交上来的密码是相同
  if(body.pwd01 !== body.pwd02){ res.send({meta: {
    msg: "pwd ERROR",
    status: 405
  }}) }
	try {
		await client.connect();
    const db = client.db("funguy")
    const loginDb = db.collection('login')
    // 先查询login表里是否已经注册
		let data = await loginDb.find({username: body.usernameReg}).toArray()
		
    if(data.length !== 0){
      data = {
        meta: {
          msg: "had registered",
          status: 444
        }
      }
      res.send(data)
    }else{
      // 在login表中添加新用户
      let data1 = await loginDb.insertOne({username: body.usernameReg, pwd: body.pwd01})
      const touXiangDb = db.collection('touXiang')
      // 增加touXiang数据
      await touXiangDb.insertOne({username: body.usernameReg, pwd: body.pwd01, touxiang: "static/kongbai.png"})
      // 增加user数据
      const userDb = db.collection('user')
      await userDb.insertOne({username: body.usernameReg, pwd: body.pwd01, nicheng: "俺是大狗熊！", 
          grjj: "俺是狗熊岭的大狗熊，俺叫熊二,嘻嘻嘻！",
          sex: "男",
          address: registerCity.address})
      data1 = dataGeShi(data1)
      
      res.send(data1)
    }
	} catch(err) {
		res.send("错误" + err)
	} finally {
		client.close();
	}
})

module.exports = router