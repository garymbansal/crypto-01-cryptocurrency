var crypto = require('crypto-js');
var hashed = crypto.SHA256("chapter quiz");
hashed = crypto.SHA256(hashed.toString(crypto.enc.Hex));

console.log(hashed.toString(crypto.enc.Hex).length);

