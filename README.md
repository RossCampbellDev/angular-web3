# Angular/Web 3 Test
## Moralis/Express 'server'
`src/app/index.js` contains the code that uses Moralis and Express to provide a server/service that answers REST requests.
These requests can interact with a specified contract/wallet, on any given EVM chain.  We can call functions from the chosen
contract etc.

## Angular app
this front end consumes the above service to display the web3 information we request

## MetaMask compatibility
`> npm install @wagmi/core@0.5.8 ethers axios`
`> ng generate component signin`
`> ng generate component user`

add the environments file that specifies our localhost testing environment

open our routing module and add the two new components

in our signin component, add a button that calls a "handleAuth" function.  (async, of course)
then go to the user component:

### now modify our "server" in index.js
`> npm install cookie-parser jsonwebtoken dotenv`

make an env file to hold our app's domain, our moralis api key, our angular URL, and our authentication secret

go to our user component and start adding routes to handle verification and creation of messages with Moralis, logout, and authentication.

then complete the signin component to integrate it with our server.  for this we use axios router and getDefaultProvider from Ethers.