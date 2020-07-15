"use strict";
exports.__esModule = true;

exports.tweetnacl = exports.generateKeyPair = exports.decrypt = exports.encrypt = void 0;

var tweetnacl = require("tweetnacl");
var tweetnacl_util = require("tweetnacl-util");
var newNonce = function () { return tweetnacl.randomBytes(tweetnacl.box.nonceLength); };

exports.tweetnacl = tweetnacl;

exports.generateKeyPair = function () { return tweetnacl.box.keyPair(); };

exports.decrypt = function  (secretOrSharedKey, messageWithNonce, key) {

    var messageWithNonceAsUint8Array = tweetnacl_util.decodeBase64(messageWithNonce);
    var nonce = messageWithNonceAsUint8Array.slice(0, tweetnacl.box.nonceLength);
    var message = messageWithNonceAsUint8Array.slice(tweetnacl.box.nonceLength, messageWithNonce.length);
    var decrypted = key
        ? tweetnacl.box.open(message, nonce, key, secretOrSharedKey)
        : tweetnacl.box.open.after(message, nonce, secretOrSharedKey);
    if (!decrypted) {
        throw new Error('Could not decrypt message');
    }
    var base64DecryptedMessage = tweetnacl_util.encodeUTF8(decrypted);
    return JSON.parse(base64DecryptedMessage);
};

exports.encrypt = function (secretOrSharedKey, json, key) {
    var nonce = newNonce();
    var messageUint8 = tweetnacl_util.decodeUTF8(JSON.stringify(json));
    var encrypted = key
        ? tweetnacl.box(messageUint8, nonce, key, secretOrSharedKey)
        : tweetnacl.box.after(messageUint8, nonce, secretOrSharedKey);
    var fullMessage = new Uint8Array(nonce.length + encrypted.length);
    fullMessage.set(nonce);
    fullMessage.set(encrypted, nonce.length);
    var base64FullMessage = tweetnacl_util.encodeBase64(fullMessage);
    return base64FullMessage;
};