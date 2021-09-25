const multer = require('multer');
const path = require('path');
const sd = require('silly-datetime');
const mkdirp = require('mkdirp')

let tools={
    // 头像上传操作工具
    multer(){
        var storage = multer.diskStorage({
            //配置上传的目录
            destination: async (req, file, cb)=>{
                let day=sd.format(new Date(), 'YYYYMMDD');
                // static/upload/20200703
                let dir=path.join("static/upload",day)
                await mkdirp(dir)
                cb(null, dir) //上传之前目录必须存在
            },
            //修改上传后的文件名
            filename: (req, file, cb)=> {
                let extname= path.extname(file.originalname);
                cb(null, Date.now()+extname)
            }
        })
        
        var upload = multer({ storage: storage })

        return upload;
        
    },
    // 照片分享操作工具
    multerShare(){
        var storage = multer.diskStorage({
            //配置上传的目录
            destination: async (req, file, cb)=>{
                let day=sd.format(new Date(), 'YYYYMMDD');
                // static/upload/20200703
                let dir=path.join("public/shareImage",day)
                await mkdirp(dir)
                cb(null, dir)
            },
            filename: (req, file, cb)=> {
                let extname= path.extname(file.originalname);
                cb(null, Date.now()+extname)
            }
        })
        
        var upload = multer({ 
            limits:{
                //限制文件大小5MB
                fileSize: 5250000,
                //限制文件数量
                files: 6
            },
            storage: storage 
        })

        return upload;
        
    },

    md5(){

    }
}

module.exports=tools