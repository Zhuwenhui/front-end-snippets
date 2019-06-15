const request = require('request');
const cheerio = require('cheerio');
const filesystem = require('fs');

const vm = require('vm');
const website = 'https://coursehunters.net/course/glubokie-osnovy-javascript-v2';
const filename = website.substring(website.lastIndexOf('/') + 1, website.length).replace('-', '_') + '.js';



function replaceAll(content) {
    return content.replace(/var totalDuration.*;/gm, ' ')
        .replace(/totalDuration.*/gm, '')
        .replace(/playerInstance.setup\(\{\n.*,\n.*,\n.*,\n.*,\n.*,\n.*\{\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\}\);/gm, '')
        .replace(/var playerInstance.*;/gm, '')
        .replace(/\t/gm, '')
        .replace(/document.*{\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\}\);/gm, '')
        .replace(/playerInstance.on.*\{\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\);/gm, '')
        .replace(/var course_id*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*/gm, '')
        .replace(/\/\/ class Progress.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*\n*.*/gm, '')
        .replace(/document.*\n*.*\n*.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*/gm,'');
}


const url = 'https://larry850806.github.io/2016/09/04/es7-environment/';
request(website, function (error, response, html) {
    if (!error && response.statusCode == 200) {
        filesystem.exists(`${process.cwd()}/${filename}`, function (exists) {
            if (!exists) {
                (function (callback) {
                    
                    const $ = cheerio.load(html);
                    // console.log($.html());
                    const script = $('body > div.main-content.relative > div > div > script:nth-child(5)');                    const fsWrite = filesystem.createWriteStream(`${process.cwd()}/${filename}`);


                    console.log(`${process.cwd()}/${filename}`);
                    filesystem.mkdir(`${process.cwd()}/${filename.replace('.js','')}`,0777,function(error){
                        if(error) throw error;
                    });
                    // console.log(script.html());
                    //动态执行
                    // vm.runInThisContext(replaceAll(script.html()))
                    fsWrite.write(replaceAll(script.html()), 'utf-8');
                    fsWrite.write("module.exports = myPlaylist")
                    // console.log(myPlaylist);
                    // callback();
                })(function () {
                    console.log(myPlaylist)
                })
            }
        })
    }
})



// //数据临时存储地方
// var data = '';
// //准备读取的目录
// var file_path = `./${filename.replace('.js', '')}.js`
// //创建一个读取文件流
// var read_stream = filesystem.createReadStream(file_path);
// //设置编码
// read_stream.setEncoding('utf8');
// //处理数据流事件
// read_stream.on('data', function (chunk) {
//     // console.log('第一次数据'+chunk)
//     // console.log(chunk)
//     data += chunk;
//     // console.log(data);
//     // console.log(data.replace(/totalDuration.*;/gm,'-'));
//     const write = filesystem.createWriteStream(file_path);


//     write.write(body, 'utf-8');
//     write.write("module.exports = myPlaylist")
//     write.end()
// });