const express = require("express");
const app = express();
const cors = require("cors");
const { recoverKey, hashTransaction, publickKeysAreEqual } = require("./scripts/crypto.js");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "02bdc93cba0c2c19552440263d526b1f93c386a0384e116c5e4d70d878874fc9f0": 100,
  "03528dbf95fcbfcc7ea5b0e17df4501170a7ebb5766792cab7b50bc0ac063bccf7": 50,
  "030ccd0a7f48b41dc79d86c3e370630ea3c696449f5d8babc72beb7adc490ce1d5": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;
  console.log({ sender, recipient, amount, signature });

  const hashTx = hashTransaction(sender, amount, recipient);
  const pubKey = recoverKey(hashTx, signature);
  if (! publickKeysAreEqual(pubKey, sender)) {
    res.status(400).send({ message: "Invalid signature!" });
  } else {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
