import { useState } from "react";
import server from "./server";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

function Transfer({ address, setBalance, sendAmount, setSendAmount, recipient, setRecipient, signature}) {
  const setValue = (setter) => (evt) => setter(evt.target.value);

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
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Signature
        <textarea
          value={JSON.stringify(signature)}
          
          rows="5"
        ></textarea>
      </label>

      <input type="submit" className="button" value="Broadcast Transaction" />
    </form>
  );
}

export default Transfer;
