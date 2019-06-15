var ProgressBar = require('progress');
 
var bar = new ProgressBar(':bar', { total: 100000 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('\ncomplete\n');
    clearInterval(timer);
  }
}, 1000);