import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalancesComponent } from './balances/balances.component';
import { PeopleComponent } from './people/people.component';

const routes: Routes = [
  { path: "balances", component: BalancesComponent },
  { path: "people", component: PeopleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
