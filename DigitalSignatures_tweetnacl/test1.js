var crypt = require('./singlekey');

const msg = "Hey India";
const pairA = crypt.generateKeyPair();
const pairB = crypt.generateKeyPair();

//I am User A
const encrypted = crypt.encrypt(msg, pairB.publicKey, pairA.secretKey);

console.log(msg, encrypted.base64FullMessage);

//I am User B
const decrypted = crypt.decrypt(encrypted, pairA.publicKey, pairB.secretKey);
console.log(msg, encrypted.base64FullMessage, decrypted);