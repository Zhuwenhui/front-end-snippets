const async = require('async');
const request = require('request');
const filesystem = require('fs');
const randomstring = require('randomstring');
const notifier = require('node-notifier');


//简便写法
async.waterfall([next => {
    (function (callback) {
        callback(null, '传递1')
    })((error, response) => {
        next(error, response)
    });
}, (result, next) => {
    (function (response, callback) {
        console.log('上一层函数传递的参数' + response)
        callback(null, '传递2')
    })(result, (error, response) => {
        next(error, response)
    });
}, (result) => {
    (function (response, callback) {
        console.log('上一层函数传递的参数' + response)
        callback(null, '传递3')
    })(result, (error, response) => {
        console.log(response);
    })
}])




//实现Github数据请求流
async.waterfall([next => {
    (function (callback) {
        request({
            url: 'https://api.github.com/users', json: true, headers: { 'user-agent': 'node.js' }
        }, (error, response, body) => {
            callback(error, response);
        })
    })((error, response) => {
        if(error) throw error
        //进行下一个函数的调用
        next(error, response.body[0].login);
    });
}, (response, next) => {
    (function (response, callback) {
        request({ url: `https://api.github.com/users/${response}`, json: true, headers: { 'user-agent': 'node.js' } },
            function (error, response, body) {
                callback(error, response.body.followers_url);
            })
    })(response, (error, response) => {
        next(error, response);
    })
}, (response) => {
    (function (response, callback) {
        request({ url: response, json: true, headers: { 'user-agent': 'node.js' } }, function (error, response) {
            callback(error, response);
        })
    })(response, (error, response) => {
        //获取返回的数据 然后下载
        request.get(response.body[0].avatar_url).on('response', function (response) {
            //获取文件后缀
            console.log(response.headers['content-type'].split('/')[1])
            const file = `./${randomstring.generate({ length: 5 })}.${response.headers['content-type'].split('/')[1]}`;
            response.pipe(filesystem.createWriteStream(file))
            // Object
            notifier.notify({
                title: 'My notification', 
                message: 'Hello, there!',
                sound:true
            });
        })
    })
}]);