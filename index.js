// const express = require("express");
// const app = express();
// const port = 3001;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// const express = require("express");
// // Import Moralis
// const Moralis = require("moralis").default;
// // Import the EvmChain dataType
// const { EvmChain } = require("@moralisweb3/common-evm-utils");

// // Add a variable for the api key, address and chain
// const MORALIS_API_KEY = "oEHlfAu2WrGbwiAy8nlb5lIMREU3yYkSB4w8idmjMRQDJwqlkj09iKT65ouiOB3h";
// const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

// //https://docs.moralis.io/web3-data-api/cross-chain-requests
// const chain = EvmChain.SEPOLIA;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // Add this a startServer function that initialises Moralis
// const startServer = async () => {
//   await Moralis.start({
//     apiKey: MORALIS_API_KEY,
//   });

//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// };

// startServer();
const Moralis = require("moralis").default;

const express = require("express");
const cors = require("cors");

const { EvmChain } = require("@moralisweb3/common-evm-utils");

const app = express();
const port = 3001;

// allow access to Angular app domain
//cross origin request... something
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

const MORALIS_API_KEY = "oEHlfAu2WrGbwiAy8nlb5lIMREU3yYkSB4w8idmjMRQDJwqlkj09iKT65ouiOB3h";
const address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
const chain = EvmChain.SEPOLIA;

app.get("/balances", async (req, res) => {
  try {
    // Promise.all() for receiving data async from two endpoints
    const [nativeBalance, tokenBalances] = await Promise.all([
      Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.SEPOLIA,
        address,
      }),
      Moralis.EvmApi.token.getWalletTokenBalances({
        chain: EvmChain.SEPOLIA,
        address,
      }),
    ]);
    res.status(200).json({
      // formatting the output
      address,
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

const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

async function getDemoData() {
    // Get native balance
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain,
    });
  
    // Format the native balance formatted in ether via the .ether getter
    const native = nativeBalance.result.balance.ether;
  
    return { native };
}

app.get("/demo", async (req, res) => {
    try {
      // Get and return the crypto data
      const data = await getDemoData();
      res.status(200);
      res.json(data);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500);
      res.json({ error: error.message });
    }
  });

startServer();