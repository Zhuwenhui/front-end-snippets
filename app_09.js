const fs = require('fs');
const async = require('async');
const request = require('request')

fs.readdir(process.cwd(), function (error, files) {

    var count = files.length;
    var results = {};

    //https://nodejs.org/api/buffer.html#buffer_new_buffer_size
    files.forEach(function (filename) {
        fs.readFile('./' + filename, function (error, data) {
            results[filename] = data.toString();
            // console.log(results);
        })
    })



});

async.concat([process.cwd(), module.paths[1]], fs.readdir, function (err, files) {
    // files is now a list of filenames that exist in the 3 directories
    // console.log(files);
});


//顺序的做一些事情
async.series([callback => {
    const options = {
        url: 'https://api.github.com/repos/request/request',
        headers: {
          'User-Agent': 'request'
        }
      };
      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          const info = JSON.parse(body);
          console.log('haha')
          callback(null,'a')
        }
      }
      request(options, callback);
      callback(null,'a')
}, callback => {
    callback(null, 'two')
}], (error, results) => {
    console.log(results);
})


async.series({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    console.log(results);
});



