const request = require('request');


//处理的结果
function func1(callback) {
    request({
        url: 'https://api.github.com/users',
        json: true,
        headers: { 'user-agent': 'node.js' }
    }, (error, response, body) => {
        //进行callback
        callback(null, response)
    })
}

//处理的结果
function func2(url, callback) {
    request({
        url: `https://api.github.com/users/${url.body[0].login}`, json: true, headers: {
            'user-agent': 'node.js'
        }
    }, (error, response, body) => {
        callback(null, response.body.followers_url)
    })
}


//处理的结果
function func3(url, callback) {
    request({
        url: url, json: true, headers: {
            'user-agent': 'node.js'
        }
    }, (error, response, body) => {
        callback(null, response)
    })

}


//当我们要发起一连串请求 当发送一个请求依赖上一个请求的结果 传统方式写法太繁琐 这样也叫回调地狱链
//解决办法:async.waterfall
func1(function (err1, result1) {
    if (err1) throw err1;
    func2(result1, function (err2, result2) {
        if (err2) throw err2;
        func3(result2, function (error, finalyResult) {
            if (error) throw error;
            console.log(finalyResult)
        })
    })
});

