const _cliProgress = require('cli-progress');
 
// create a new progress bar instance and use shades_classic theme
const bar1 = new _cliProgress.Bar({
    format: 'progress [{bar}] {percentage}% | {value}/{total} | Speed: {speed} kbit'
}, _cliProgress.Presets.shades_grey);
 
// start the progress bar with a total value of 200 and start value of 0
bar1.start(1000, 0);
 

bar1.update(500);

// // update the current value in your application..
// bar1.update(10);
// bar1.update(20);
 
// stop the progress bar
bar1.stop();