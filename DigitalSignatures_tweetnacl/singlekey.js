"use strict";
exports.__esModule = true;

exports.tweetnacl = exports.generateKeyPair = exports.decrypt = exports.encrypt = void 0;

var tweetnacl = require("tweetnacl");
var tweetnacl_util = require("tweetnacl-util");
var newNonce = function () { return tweetnacl.randomBytes(tweetnacl.box.nonceLength); };

exports.tweetnacl = tweetnacl;


exports.generateKeyPair = function () { return tweetnacl.box.keyPair(); };

exports.decrypt = function(encrypted, theirPublicKey, mySecretKey) {

    var messageWithNonceAsUint8Array = tweetnacl_util.decodeBase64(encrypted.base64FullMessage);
    var nonce = messageWithNonceAsUint8Array.slice(0, tweetnacl.box.nonceLength);
    var message = messageWithNonceAsUint8Array.slice(tweetnacl.box.nonceLength, encrypted.base64FullMessage.length);
    var decrypted = tweetnacl.box.open(encrypted.encrypted, nonce, theirPublicKey, mySecretKey);
    if (!decrypted) {
        throw new Error('Could not decrypt message');
    }
    var base64DecryptedMessage = tweetnacl_util.encodeUTF8(decrypted);
    return base64DecryptedMessage;
};

exports.encrypt = function (message, theirPublicKey, mySecretKey) {
    var nonce = newNonce();
    var messageUint8 = tweetnacl_util.decodeUTF8(message);
    var encrypted = tweetnacl.box(messageUint8, nonce, theirPublicKey, mySecretKey);

   
    var fullMessage = new Uint8Array(nonce.length + encrypted.length);
    fullMessage.set(nonce);
    fullMessage.set(encrypted, nonce.length);
    var base64FullMessage = tweetnacl_util.encodeBase64(fullMessage);
    return {encrypted : encrypted, base64FullMessage : base64FullMessage};
};