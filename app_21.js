const fs = require('fs')


fs.readdir(process.cwd(), function (err, files) {
    if (err) {
      console.log(err);
      return;
    }
    var count = files.length;
    var results = {};
    files.forEach(function (filename) {
    //   fs.readFile(filename, function (data) {
    //     results[filename] = data;
    //     count--;
    //     if (count <= 0) {
    //       // 对所有文件进行处理
    //     }
    //   });
        console.log(filename);
    });
  });