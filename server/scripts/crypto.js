const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils.js");


function recoverKey(hashTransaction, signature) {
  return signature.recoverPublicKey(hashTransaction).toRawBytes();
}

function getAddress(publicKey) {
  return toHex(keccak256(publicKey.slice(1)).slice(-20));
}

function hashTransaction(sender, amount, recipient){
  const transaction = {
    sender,
    amount: parseInt(amount),
    recipient
  };
  return keccak256(utf8ToBytes(JSON.stringify(transaction)));
}

function publicKeysAreEqual(a, b) {
  if (a.byteLength !== b.byteLength) return false;
  return a.every((val, i) => val === b[i]);
}

module.exports = {
  recoverKey,
  hashTransaction,
  publicKeysAreEqual
}