const async = require('async');


var stack = []

//函数里面都是异步执行
const functionOne = function (callback) {
    console.log(callback);
    callback(null, 'First function result');
}
const functionTwo = function (callback) {
    callback(null, 'second function result');
}
const functionThree = function (callback) {
    callback(null, 'third function result');
}


stack.push(functionOne);
stack.push(functionTwo);
stack.push(functionThree);

console.log(stack);
//并行执行
async.parallel(stack, function (err, result){
    console.log('Async paralle with array',result);
});


console.log(process.cwd())