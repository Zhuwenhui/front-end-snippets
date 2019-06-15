// 引入FS模块
var file_system = require("fs");

//数据临时存储地方
var data = '';
//准备读取的目录
var file_path = __dirname + '/kebukeyi.txt'
//创建一个读取文件流
var read_stream = file_system.createReadStream(file_path);
//设置编码
read_stream.setEncoding('utf8');
//处理数据流事件
read_stream.on('data', function (chunk) {
    console.log(chunk)
    data += chunk;
});

//当数据读取完毕    回调用这个方法
read_stream.on('end',console.log.bind(console,'读取完毕'))
//当数据读取发生错误 回调这个函数
read_stream.on('error',console.error.bind(console,'读取发生错误'))


