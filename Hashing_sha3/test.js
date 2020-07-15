const {SHA3} = require('sha3');
const fs = require('fs');
const { compileFunction } = require('vm');
const hash = new SHA3(256);


console.log("hash from string");
let myhash1 = hash.update("this is test");
console.log(myhash1.digest("hex"));

// hash.reset();

// let myhash2 = hash.update("this is tes");
// console.log(myhash2.digest("hex"));

hash.reset();

console.log("hash from file");
fs.readFile('test.txt', 'utf8', function(err, data){
    if(err){
        return console.log(err);
    }
    let myhash3 = hash.update(data);
    console.log(myhash3.digest('hex'));
});

