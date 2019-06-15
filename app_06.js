const filesystem = require('fs');


//读取路径
const doReadPath = `${__dirname}/read.txt`;
const readStream = filesystem.createReadStream(doReadPath);
//设置编码
readStream.setEncoding('utf-8');
readStream.on('end', console.log.bind(console, '读取完毕'));
readStream.on('error', console.log.bind(console, 'oops!'));


// 写入路径
const doWritePath = `${__dirname}/kebukeyi.txt`;
//创建写入流
const writeStream = filesystem.createWriteStream(doWritePath, { 'flags': 'a' });
//直接写入管道
readStream.pipe(writeStream)

//开始监听写入事件
writeStream.on('finish', console.log.bind(console, '写入完毕'));
writeStream.on('error', console.log.bind(console, 'Oops!'));



