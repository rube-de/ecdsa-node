import server from "./server";
import {getPublicKey, loadTestWallets} from "./Crypto";
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import { useEffect } from "react";


function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, wallets, setWallets }) {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  wallets = loadTestWallets();

  async function handleSelect(event) {
    const privateKey = event.target.value;
    setPrivateKey(privateKey);
    const publicKey = getPublicKey(privateKey);
    console.log(`publicKey: ${publicKey}`);
    address = toHex(publicKey);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onChangePK(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = getPublicKey(privateKey);
    console.log(`publicKey: ${publicKey}`);
    address = toHex(publicKey);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        PrivateKey
        <input  value={privateKey} onChange={onChangePK}></input>
      </label>

      <label>
        privateKey wallet
        <select onChange={handleSelect}>
          <option value=""></option>
          {wallets.map((wallet, index) => (
            <option key={index} value={wallet.privateKey}>{wallet.privateKey}</option>  
          ))}
        </select>
      </label>
      <label>
        Wallet Address
        <input value={address} readOnly></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
