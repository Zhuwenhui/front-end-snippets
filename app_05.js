var file_system = require('fs');


//写入的基本内容
var content = "世界你好👋";
//写入的文件路径
var DoWriteFilePath = `${__dirname}/kebukeyi.txt`
//创建一个写入数据流
const writeStream = file_system.createWriteStream(DoWriteFilePath);
//写入文件
writeStream.write(content, 'utf-8');
//写入完毕
writeStream.end();
//写入完毕
writeStream.on('finish', console.log.bind(console,'写入完毕'));
writeStream.on('error',console.error.bind(console,'Oops!'));
