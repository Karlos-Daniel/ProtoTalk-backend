const net = require('./config');

let output = net.run([0, 0]); // [0]
output = net.run([0, 1]); // [1]
console.log(output);
output = net.run([1, 0]); // [1]
console.log(output);
output = net.run([1, 1]); // [0]
console.log(output);