const Moralis = require("moralis").default;

const express = require("express");
const cors = require("cors");
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const app = express();
const port = 3001;
const fs = require('fs');
const abi = JSON.parse(fs.readFileSync('src/app/ABI.json', 'utf8'));

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

const MORALIS_API_KEY = "oEHlfAu2WrGbwiAy8nlb5lIMREU3yYkSB4w8idmjMRQDJwqlkj09iKT65ouiOB3h";
const sepolia_wallet = "0x6F62bD3FEd8267b04caF88561Fb13f2C7e5Fc598";
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


async function runContractFunction(_functionName, _params) {
    const response = await Moralis.EvmApi.utils.runContractFunction({
        chain: chain,
        address: sepolia_contract_address,
        abi: abi,
        functionName: _functionName,
        params: _params
    });
    //console.log(`Response: ${JSON.stringify(response)}`)
    return response;
}

app.get("/getPerson/:n", async (req, res) => {
    try {
      const data = await runContractFunction("getPerson", 
        {"n": String(req.params["n"])}
      );
      res.status(200);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.json({ error: error.message });
    }
  });

app.get("/getPopulation", async (req, res) => {
    try {
      // Get and return the crypto data
      const data = await runContractFunction("getPopulation", {});
      res.status(200);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.json({ error: error.message });
    }
  });

app.post('/newPerson', async (req, res) => {  
    try {
      const name = req.query.name;
      const age = req.query.age;
      const data = await runContractFunction("newPerson", { "_name": String(name), "_age": String(age) });
      res.status(200);
      res.json(data);
      console.log(data);
    } catch(error) {
      console.log(error);
    }
  });

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


startServer();

module.exports = [  ]