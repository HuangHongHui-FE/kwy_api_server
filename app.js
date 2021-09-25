const express = require('express')

const app=express()


const bodyParser = require('body-parser')



const Grzl = require("./routes/funguy/grzl")
const UgrzlPost = require("./routes/user/UgrzlPost")
const UgrzlGet = require("./routes/user/UgrzlGet")

const TouXiang = require("./routes/user/touXiang")
const TouXiangGet = require("./routes/user/touXiangGet")
const Ctimage = require("./routes/funguy/ctimage")
const Defind = require("./routes/funguy/defind")
const Gsimage = require("./routes/funguy/gsimage")
const Kcsp = require("./routes/funguy/kcsq")
const Koulan = require("./routes/funguy/koulan")
const Mcsp = require("./routes/funguy/mcsq")
const Mlsp = require("./routes/funguy/mlsq")
const Mvp = require("./routes/funguy/mvp")
const New = require("./routes/funguy/new")
const School = require("./routes/funguy/school")
const Seven = require("./routes/funguy/seven")
const Younger = require("./routes/funguy/younger")
const Image = require("./routes/funguy/image")
const Search = require("./routes/funguy/search")
const ImgCode = require("./routes/login/imgCode")
const Register = require("./routes/login/register")
const Login = require("./routes/login/login")
const NewBlogPost = require("./routes/user/newBlogPost")
const SelfBlogGet = require("./routes/user/selfBlogGet")
const SelfBlogDel = require("./routes/user/selfBlogDel")
const UpdateViewComment = require("./routes/user/updateViewComment")
const Share = require("./routes/share/share")
const Classify = require("./routes/user/classify")
const MusicGet = require("./routes/music/musicGet")
// 
const VideoGetPc = require("./routes/video/videoGetPc")
const VideoPush = require("./routes/video/videoGetPc")
const LoveCommentGet = require("./routes/video/videoGetPc")


// 设置post最大的数据大小
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '100mb'}))
app.use("/public", express.static("public"))


// app.all("/*", function(req, res, next) {
//     // 跨域处理
//     res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     // res.header("X-Powered-By", ' 3.2.1');
//     // res.header("Content-Type", "application/json;charset=utf-8");
//     // res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");

//     next(); // 执行下一个路由
// })
app.all('/*', function(req, res, next) {
    console.log(req.headers.origin)
     //需要显示设置来源
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");     
    res.setHeader("Access-Control-Allow-Credentials", true); //带cookies7
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    if(req.headers.origin){
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }
    
    next();
});


app.get("/kwy/grzl", Grzl)

app.get("/",(req,res)=>{
    res.send("你好 express")
})

app.post("/login", Login)

app.post("/user/grzl", UgrzlPost)

app.get("/user/grzl", UgrzlGet)

app.post("/touXiang", TouXiang)

app.get("/touXiangGet", TouXiangGet)

// 图片区的分类
app.get("/kwy/tpq/ctimage", Ctimage)
app.get("/kwy/tpq/defind", Defind)
app.get("/kwy/tpq/gsimage", Gsimage)
app.get("/kwy/tpq/kcsq", Kcsp)
app.get("/kwy/tpq/koulan", Koulan)
app.get("/kwy/tpq/mcsq", Mcsp)
app.get("/kwy/tpq/mlsq", Mlsp)
app.get("/kwy/tpq/mvp", Mvp)
app.get("/kwy/tpq/new", New)
app.get("/kwy/tpq/school", School)
app.get("/kwy/tpq/seven", Seven)
app.get("/kwy/tpq/younger", Younger)

app.get("/kwy/tpq", Image)
app.get("/kwy/tpq/search", Search)

// 图片验证码请求
app.get("/imgCode", ImgCode)

// 注册
app.post("/register", Register)

// 博客上传
app.post("/user/newBlogPost", NewBlogPost)

// 个人博客get     id得到博客
app.get("/user/selfBlogGet", SelfBlogGet)

// 个人博客删除
app.delete("/user/SelfBlogDel", SelfBlogDel)

// 获取博客详情页的数据
app.get("/user/getBlogConById", SelfBlogGet)

// 获取write博客选择的分类
app.get('/user/writeBlog/classify', Classify)
// 分类博客数据的获取pc
app.get("/share/classifyBlogGet", Classify)
// 分类博客数据的获取M
app.get("/share/classifyBlogGetM", Classify)

// 单纯根据id获取博客内容
app.get('/user/getBlogById', SelfBlogGet)

// 做更新views数与comments数
app.post('/user/updateComment', UpdateViewComment)
// 做更新views数与comments数
app.post('/user/updateView', UpdateViewComment)

// 返回所有inputTitle,做分享页Blogs的搜索框用了
app.get("/share/blogs/inputTitleGet", Share)
// 返回所有inputTitle,做分享页leonard的搜索框用了
app.get("/share/blogs/inputTitleGetLeonard", Share)

// 分页返回blogs信息
app.get("/share/blogs/allBlogs", Share)

// 用户上传过来的图册信息处理
app.post("/user/uploadPhoto", TouXiang)

// share的Leonard页数据的返回
app.get("/share/leonard", Share)

// 网页上请求音乐链接地址，数据库返回给
app.get("/musicGet", MusicGet)

// 视频获取
app.get("/videoGet", VideoGetPc)
// 手机端评论push
app.post("/videoCommentPush", VideoPush)
// 手机端喜爱push
app.post("/videoLovePush", VideoPush)

// love,comment单个视频查取
app.get("/loveCommentGet", LoveCommentGet)

app.listen(3000)