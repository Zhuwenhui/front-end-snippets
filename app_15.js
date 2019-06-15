const async = require('async');
const request = require('request');
const randomstring = require('randomstring');
const filesystem = require('fs');





// const ProgressBar = require('./progressbar.js')
var ProgressBar = require('progress');

//我们来使用并发进行来进行文件下载
const store = [];
//进行存储函数
const stack = [];

for (let i = 1; i <= 12; i++) {
    store.push(`https://vs2.coursehunters.net/vm-ac-cc/lesson${i}.mp4`);
}


(function () {
    //实现文件下载
    store.forEach(function (url) {
        const downloader = function (callack) {
            request.get(url).on('response', function (response) {
                //totalSizeBytes / 1024 KB/ 1024 /MB
                const total = parseInt(response.headers['content-length'], 10);
                //1.先获取文件后缀 
                const extname = response.headers['content-type'].split('/')[1];
                //2.进行文件下载
                const filename = `${process.cwd()}/images/${randomstring.generate({ length: 5 })}.${extname}`;
                response.pipe(filesystem.createWriteStream(filename));

                var bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
                    complete: '=',
                    incomplete: ' ',
                    width: 100,
                    total: total
                });

                response.on('data', function (chunk) {
                    bar.tick(chunk.length);
                });

                //参数回掉
                callack(null, { filename: filename, status: 'OK', size: response.headers['content-length'] })
            });
        }
        stack.push(downloader)
    })


    //进行并发允许 等待结果
    async.parallel(stack, function (error, response) {
        console.log('下载完毕');
    });
})
