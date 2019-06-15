const async = require('async');


//处理的结果
function func1(callback) {
    callback('第一层的错误', '第1层')
}

//处理的结果
function func2(url, callback) {
    console.log('传递过来的参数2' + url )
    callback(null, '第2层')
}


//处理的结果
function func3(url, callback) {
    console.log('传递过来的参数3' + url )
    callback(null, '第3层')
}


async.waterfall([next => {
    func1((err, result1) => {
        console.log(result1);
        //and we can see output of this program is an array containing results
        //computed from each functions in the stack:
        //这err是传递给栈区
        next(err, result1);
    })
}, (result1, next) => {
    func2(result1, (err, result2) => {
        next(err, result2)
    })
}, (result2, next) => {
    func3(result2, (error, finalyResult) => {
        console.log(finalyResult);
    })
}]);

