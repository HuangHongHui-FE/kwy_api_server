const { MongoClient } = require('mongodb');

const url = 'mongodb://admin:hzddsyhhh123@127.0.0.1:27017/';

//5、实例化MongoClient 传入数据库连接地址
const client = new MongoClient(url, { useUnifiedTopology: true });


module.exports = client