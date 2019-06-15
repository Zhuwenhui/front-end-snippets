const fs = require('fs');
const request = require('request-promise');



const options = {
    method: 'GET',
    url: 'https://m.yd.frxs.cn/api/store/trade/order/store/getOrderAreaList?page=1&rows=20&store\
    IsShow=true&searchTab=1&menuId=1&phone=&receiver=&wechatName=&billOfLading=&userKey=6e37f289-24b6-46e3-9571-cc3c252775a6',
    //如果请求的接口是JSON JSON必须等于TRUE
    json: true
}

request(options).then(response => {
    console.log(response.data.records);
}).catch(err => {
    console.log(err)
})





//获取脚本执行的目录
console.log(process.cwd())



