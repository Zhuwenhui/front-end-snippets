

#### 👋[fs] 模块练习


#####   1⃣️追加文件数据 并写入数据
```
fs.appendFile('mynewfile1.txt', JSON.stringify([1, 2, 3]), function (err) {
    if(err) throw err;
    console.log('写入完毕')
})
```

#####   2⃣️删除一个文件
```
fs.unlink('basic.txt', (err) => {
    if(err) throw err;
    console.log('File system operation successfully executed!')
})
```

#####    3⃣️try-catch 块中。让我们说我们已经删除了该文件并再次尝试运行该命令,因此我们需要定义try-catch错误机制同样我们需要执行同步操作而不是异步操作。

```
try {
    fs.unlinkSync('acme.js')
    console.log('File system operation successfully executed');
} catch (error) {
    console.log('Executed Catch block')
    console.log(error);
}
```

#####   4⃣ 对文件进行重名

```
fs.rename('mynewfile1.txt', 'kebukeyi.txt', function (err) {
    if (err) throw err;
    console.log('file renamed');
})
```



#####   5⃣️读取数据流

```
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

这种写法也是可以

#当读取完毕触发事件
read_stream.on('end', function () {
    // Output read data to console.
    console.log("Stream data is : " + data);
});
#Read stream error event.
read_stream.on('error', function (err) {
    console.log(err.stack);
});

```


#####   6⃣写入数据

```js
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
```


#####   7⃣️实现复制文件

```
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
//直接写入管道 这里是关键
readStream.pipe(writeStream)

//开始监听写入事件
writeStream.on('finish', console.log.bind(console, '写入完毕'));
writeStream.on('error', console.log.bind(console, 'Oops!'));
```


#####   8⃣️文件复制高效版
```
var filesystem = require('fs');
var randomstring = require('randomstring');

//二进制文件也可以进行复制
const copy = filesystem.createReadStream(`${__dirname}/jgt.svg`)
    .pipe(filesystem.createWriteStream(`${__dirname}/${randomstring.generate({ length: 5 })}.svg`, { 'flags': 'a' }))
copy.on('error', console.log.bind(console, 'Oops! have a error'));

// destination.txt will be created or overwritten by default.
filesystem.copyFile('source.txt', 'destination.txt', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
});
```
####    👖第三方库



#####   1⃣️随机生成的字符串[文档参考](https://www.npmjs.com/package/randomstring)
```
const randomstring = require('randomstring');
console.log(randomstring.generate({
    length: 5,
    charset: 'alphabetic'
}))
```






####   🙅常见错误大全

>Unhandled rejection Error: EACCES: permission denied

#####   解决办法[解决办法涞源](https://github.com/npm/npm/issues/17480):
+   sudo chown -R $(whoami) ~/.npm
+   sudo chown -R $(whoami) ~/.node-gyp


https://m.yd.frxs.cn/api/store/trade/order/store/getOrderAreaList?page=1&rows=20&storeIsShow=true&searchTab=1&menuId=1&phone=&receiver=&wechatName=&billOfLading=&userKey=6e37f289-24b6-46e3-9571-cc3c252775a6