'use strict';
const vm = require('vm');

const code = `
    var list = [];
    list.push(1);
    list.push(2);
    console.log(list);
`;

vm.runInThisContext(code);

console.log(list);
