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

