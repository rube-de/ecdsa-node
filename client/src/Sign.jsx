import server from "./server";
import {verify, getPublicKey, signMsg, hashTransaction, recover} from "./Crypto";
import { useState } from "react";
import {toHex} from "ethereum-cryptography/utils.js";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

function Sign({ privateKey, signature, setSignature, sendAmount, setSendAmount, recipient, setRecipient}) {

  const setValue = (setter) => (evt) => setter(evt.target.value);

  function signTransaction(evt) {
    evt.preventDefault();
    
    const sender = getPublicKey(privateKey);
    const message = hashTransaction(sender, sendAmount, recipient);
    signature = signMsg(privateKey, message);
    const pub = recover(signature, message);
    const isValid = verify(signature, message, sender);
    console.log(`valid signature: ${isValid}`);
    setSignature(signature);
  }

  return (
    <form className="container transfer" onSubmit={signTransaction}>
      <h1>Sign Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Sign" />
      <label>
        Signature
        <input value={JSON.stringify(signature)} readOnly></input>
      </label>
    </form>
  );
}

export default Sign;