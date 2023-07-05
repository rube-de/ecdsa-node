const { secp256k1 } = require("@noble/curves/secp256k1");
const { toHex } =require("ethereum-cryptography/utils.js");


const priv = secp256k1.utils.randomPrivateKey();
const pub = secp256k1.getPublicKey(priv);
const msg = new Uint8Array(32).fill(1);
const sig = secp256k1.sign(msg, priv);
const isValid = secp256k1.verify(sig, msg, pub) === true;
console.log(`isValid: ${isValid}`);
const isRecoverValid = toHex(sig.recoverPublicKey(msg).toRawBytes()) === toHex(pub) ? "ya":"nein";
console.log(`isRecoverValid: ${isRecoverValid}`);