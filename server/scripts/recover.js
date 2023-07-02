const { secp256k1 } = require("@noble/curves/secp256k1");

const priv = secp256k1.utils.randomPrivateKey();
const pub = secp256k1.getPublicKey(priv);
console.log(typeof pub);
console.log(`pub: ${pub}`);
console.log(pub.length);
const msg = new Uint8Array(32).fill(1);
const sig = secp256k1.sign(msg, priv);
const isValid = secp256k1.verify(sig, msg, pub) === true;
console.log(`isValid: ${isValid}`);
const recoverPub = sig.recoverPublicKey(msg).toRawBytes();
console.log(typeof recoverPub);
console.log(`recoverPub: ${recoverPub}`);
console.log(recoverPub.length);
const isRecoverValid = sig.recoverPublicKey(msg).toRawBytes().toString() === pub.toString() ? "ya":"nein";
console.log(`isRecoverValid: ${isRecoverValid}`);