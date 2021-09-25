const express = require("express")
var router = express.Router()

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")
const fs= require("fs")


function tpqTop(){
    router.get("/kwy/tpq/ctimage", async (req, res)=>{

        function pReadFile(filePath) {
            return new Promise(function(resolve, reject){
                fs.readFile(filePath, 'utf8', function(err, data2){
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
            let data = await db.collection('image').find({"mask": "ctimage"}).toArray()
            
            const dataList = []
            for(let i = 0; i < data[0].ctimage.length; i++){
                let path = "static/tpq/fenlei/" + data[0].ctimage[i]
                // console.log(path)
                pReadFile(path).then(function(data2){
                    dataList.push(data2)
                    if(i === data[0].ctimage.length - 1){
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
}

module.exports = 
{
    "router": router,
    "tpqTop": tpqTop()
}
