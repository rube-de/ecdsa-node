const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils.js");

const privateKey = secp256k1.utils.randomPrivateKey();

console.log(`privateKey: ${toHex(privateKey)}`);

const pubKey = secp256k1.getPublicKey(privateKey);

console.log(`pubKey: ${toHex(pubKey)}`);

const address = toHex(keccak256(pubKey.slice(1)).slice(-20));

console.log(`address: ${address}`);