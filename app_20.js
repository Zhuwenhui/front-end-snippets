var myPlaylist = require('./glubokie_osnovy-javascript-v2');
var fs = require('fs');
const dirname = `/Users/kitty/Desktop/Deep_JavaScript Foundations_v3`;
var emptyDir = require('empty-dir');

var stack = []

var namedrelationShip = new Map();
myPlaylist.forEach((element, index) => {
    emptyDir(`${dirname}`).then(function (result) {
        if (result) {
            fs.appendFile(`${dirname}/lesson${index}.mp4`, 'Hello content!', function (err) {
                if (err) throw err;
            });
        }
    })

    namedrelationShip.set(parseInt(element.mediaid) + 1, element.title);
    stack.push(element.file);
})


var dirnames = fs.readdirSync(dirname);
dirnames.sort(function (a, b) {
    return a - b;
    // return a.match(/\d{1,3}/gm)[0] - b.match(/\d{1,3}/gm)[0];
});

console.log(dirnames);



dirnames.forEach((element, index) => {
    console.log(namedrelationShip.get(index + 1))
    fs.rename(`${dirname}/${element}`, `${dirname}/Lesson ${index + 1}.${namedrelationShip.get(index + 1)}.webm`,
        error => console.log.bind(console, error));
})






// console.log(files[1].substring(6,7))
// var reuslt = files.sort((a, b)=> a.split(''))





// console.log(index);