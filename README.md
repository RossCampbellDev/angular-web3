## create moralis service to use
`> ng g s moralis-service` this will **g**enerate a **s**ervice of the type **moralis-service** obviously.
this generates two moralis service files in our `/app`

next, we need to import the `HttpClientModule` in `app.module.ts` so we can make requests later

next, install Metamask interface provider - we need it so typescript can have type definitions
`> npm i @metamask/providers`

then add the following imports to our `moralis-service.service.ts`:
```
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { environment } from 'src/environments/environment';
```

```
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
```
the above global interface tells our Winow that "ethereum" is of type MetaMaskInpageProvider

then define ResponseTypes which will handle requests/responses to the Moralis service:
```
export interface ResponseType {
    total: number,
    page: number,
    page_size: number,
    cursor?: null,
    result: Array<any>,
    balance: number
}
```

Now in the service class:
```
  api = environment.Moralis_api;
  chain: any;
  walletAddress: any;
```

the `environment.ts` file that we are getting our `Moralis_api` variable from is a config file that we use for switching between testing and production etc.  *The purpose of this is so we can put our API key in the file without sharing it later*

add `private http:HttpClient` as a parameter for our service's constructor
`constructor(private http:HttpClient) {`

next, create the `loginMetaMask()` function:
```
async loginMetaMask() {
	const ethereum = window.ethereum as MetaMaskInpageProvider;
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	sessionStorage.setItem('data', accounts[0]);
	return accounts[0];
}
```

the compiler wouldn't know what ethereum in `ethereum.request` is if we don't make that global interface.

`sessionStorage` creates a browser session.

Create the `getWalletAddress()` function which assigns the `walletAddress` var we created above:
```
getWalletAddress() {
	this.walletAddress = sessionStorage.getItem('data');
	return this.walletAddress;
}
```

```
getnftData() {
	return this.http.get<ResponseType>(
		`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/nft`,
		{headers:new HttpHeaders({}), params:new HttpParams().set('chain', `${this?.chain`}')}
	);
}
```

---
# Restart.  use Moralis docs
`> npm install axios` - to make requests to the moralis server.  can also use Angular's HTTP module as bove.

`> ng g c balances` make a new balances component for displaying balances.

now in `app-routing.module.ts`
```
import { BalancesComponent } from "./balances/balances.component";

const routes: Routes = [{ path: "balances", component: BalancesComponent }];
```

fill in `balances.component.html` with the boilerplat that shows address, nativeBalance, tokenBalances variables.
Then go to the component typescript file



#moralis #web3 #angular #webdev #javascript