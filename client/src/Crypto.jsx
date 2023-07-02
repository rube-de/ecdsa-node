import { secp256k1 }from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

export function getAddress(publicKey) {
  return toHex(keccak256(publicKey.slice(1)).slice(-20));
}

export function getPublicKey(privateKey) {
  return secp256k1.getPublicKey(privateKey);
}

export function createRandomPrivateKey() {
  let privateKey = secp256k1.utils.randomPrivateKey();
  console.log(privateKey);
}

export function hashTransaction(sender, amount, recipient){
  const transaction = {
    sender,
    amount: parseInt(amount),
    recipient
  };
  return keccak256(utf8ToBytes(JSON.stringify(transaction)));
}

export function signMsg(privateKey, hashedMsg) {
  return secp256k1.sign(hashedMsg, privateKey);
}

export function recover(signature, msg) {
  return signature.recoverPublicKey(msg);
}

export function loadTestWallets() {
  return [
    {
      privateKey: "8bc90d7ac4365adb06ccddcd131b3a8c6baaddc825e9e8631dc6eead0a32c933",
      pubkey: "02bdc93cba0c2c19552440263d526b1f93c386a0384e116c5e4d70d878874fc9f0"
    },
    {
      privateKey: "a142f1ec2a478da6fdb5159908454297993996dc92b0bb18d4a63211c8919e01",
      pubkey:"03528dbf95fcbfcc7ea5b0e17df4501170a7ebb5766792cab7b50bc0ac063bccf7",
    },
    {
      privateKey: "c375d39f0335aa298b774c3983882234792ae194ad07934733eb460f072b6cd8",
      pubkey: "030ccd0a7f48b41dc79d86c3e370630ea3c696449f5d8babc72beb7adc490ce1d5"
    }
  ];
}