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