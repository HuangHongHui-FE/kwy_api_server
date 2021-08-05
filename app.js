const express = require('express')

const app=express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const Grzl = require("./routes/funguy/grzl")
const UgrzlPost = require("./routes/user/UgrzlPost")
const UgrzlGet = require("./routes/user/UgrzlGet")
const Login = require("./routes/login.js")

app.use(express.static("public"))

app.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");

    next(); // 执行下一个路由
})

// 
app.get("/kwy/grzl", Grzl)

app.get("/",(req,res)=>{
    res.send("你好 express")
})

app.post("/login", Login)

app.post("/user/grzl", UgrzlPost)

app.get("/user/grzl", UgrzlGet)

app.listen(3000)