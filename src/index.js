const Moralis = require("moralis").default;

const express = require("express");
const cors = require("cors");

const { EvmChain } = require("@moralisweb3/common-evm-utils");

const app = express();
const port = 3001;

var fs = require('fs');
var abi = JSON.parse(fs.readFileSync('src/ABI.json', 'utf8'));

//import abi from "./constants/ABI.json"

// allow access to Angular app domain
//cross origin request... something
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

const MORALIS_API_KEY = "oEHlfAu2WrGbwiAy8nlb5lIMREU3yYkSB4w8idmjMRQDJwqlkj09iKT65ouiOB3h";
const sepolia_wallet = "0xc1958ea12007C9973Edb67413e56Dab9612a96a0";
const sepolia_contract_address = "0x9867032Ab5A03aE9C70b7948ae6b46422d556342"
const chain = EvmChain.SEPOLIA;

const startServer = async () => {
    await Moralis.start({
      apiKey: MORALIS_API_KEY,
    });
  
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  };

app.get("/balances", async (req, res) => {
  try {
    // Promise.all() for receiving data async from two endpoints
    const [nativeBalance, tokenBalances] = await Promise.all([
      Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.SEPOLIA,
        address: sepolia_wallet,
      }),
      Moralis.EvmApi.token.getWalletTokenBalances({
        chain: EvmChain.SEPOLIA,
        address: sepolia_wallet,
      }),
    ]);

    res.status(200).json({ // formatting the output
      address: sepolia_wallet,
      nativeBalance: nativeBalance.result.balance.ether,
      tokenBalances: tokenBalances.result.map((token) => token.display()),
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

app.get("/demo", async (req, res) => {
    try {
      // Get and return the crypto data
      const data = await getDemoData();
      res.status(200);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.json({ error: error.message });
    }
  });

async function getDemoData() {
  const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address: sepolia_wallet,
    chain,
  });
  const native = nativeBalance.result.balance.ether;

  // Get token balances
  const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
    address: sepolia_wallet,
    chain,
  });

  // Format the balances to a readable output with the .display() method
  const tokens = tokenBalances.result.map((token) => token.display());

  // Add tokens to the output
  return { native, tokens };
}


// fetch('./constants/ABI.json')
// .then(response => response.json())
// .then(data => {
//     abi = data;
// })

// to run a contract function we need ABI, address, function name
const functionName = "getPerson"
async function runFunction() {
    const response = await Moralis.EvmApi.utils.runContractFunction({
        address: sepolia_contract_address,
        functionName: "getPerson",
        abi: abi,
        chain: chain,
        params: {"n":"0"}
    });
    return response;
}

app.get("/getPerson", async (req, res) => {
    try {
      // Get and return the crypto data
      const data = await runFunction();
      res.status(200);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.json({ error: error.message });
    }
  });


startServer();

module.exports = [  ]