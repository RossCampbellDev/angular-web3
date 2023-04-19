import { Component } from '@angular/core';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent {
  constructor() {}

  address = "";
  nativeBalance = "";
  tokenBalances = "";

  ngOnInit(): void {}
}
