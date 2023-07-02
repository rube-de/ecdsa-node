import { useState } from "react";
import server from "./server";
import {recover, hashTransaction, getAddress} from "./Crypto";
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";




BigInt.prototype.toJSON = function () {
  return this.toString();
};

function Transfer({ address, setBalance, sendAmount, recipient, signature}) {

  async function transfer(evt) {
    evt.preventDefault();
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Broardcast Transaction</h1>

      <label>
        Sender Address
        <input value={address} readOnly></input>
      </label>

      <label>
        Send Amount
        <input
          value={sendAmount}
          readOnly
        ></input>
      </label>

      <label>
        Recipient
        <input
          value={recipient}
          readOnly
        ></input>
      </label>

      <label>
        Signature
        <textarea
          value={JSON.stringify(signature)}
          readOnly
          rows="5"
        ></textarea>
      </label>

      <input type="submit" className="button" value="Broadcast Transaction" />
    </form>
  );
}

export default Transfer;
