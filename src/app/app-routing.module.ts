import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalancesComponent } from './balances/balances.component';
import { PeopleComponent } from './people/people.component';
import { SigninComponent } from './signin/signin.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "balances", component: BalancesComponent },
  { path: "people", component: PeopleComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
