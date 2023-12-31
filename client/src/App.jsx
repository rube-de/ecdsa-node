import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Sign from "./Sign";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [wallets, setWallets] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        address={address}
        setAddress={setAddress}
        wallets={wallets}
        setWallets={setWallets}
      />
      <Sign
        privateKey={privateKey}
        signature={signature}
        setSignature={setSignature}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        recipient={recipient}
        setRecipient={setRecipient}
      />
      <Transfer
       setBalance={setBalance}
       address={address}
       sendAmount={sendAmount}
       setSendAmount={setSendAmount}
       recipient={recipient}
       setRecipient={setRecipient}
       signature={signature}
      />
    </div>
  );
}

export default App;
