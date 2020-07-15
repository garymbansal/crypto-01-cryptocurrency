var crypto = require('crypto'),
    keypair = require('keypair');
const { Console } = require('console');


let pair = keypair(3072); //for Receipient 

// console.log(pair["public"]);
// console.log(pair["private"]);

//----- Sender
let msg = "Lets play football";
console.log("Orginal");
console.log(msg);

let toEncrypt = Buffer.from(msg, "utf8");

let encrpted = crypto.publicEncrypt(pair["public"], toEncrypt).toString("base64");

console.log(encrpted);






//--Receipient
let toDecrypt = Buffer.from(encrpted, "base64");
let decrypted = crypto.privateDecrypt(pair["private"], toDecrypt).toString("utf8");

console.log(decrypted);

