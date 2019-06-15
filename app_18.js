const splitFile = require('split-file');

splitFile.splitFile(__dirname + '/advanced_components.js', 2)
    .then((names) => {
        console.log(names);
    })
    .catch((err) => {
        console.log('Error: ', err);
    });