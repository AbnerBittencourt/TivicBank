import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { LoginComponent } from './components/login/login.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard/:id', component: DashboardComponent},
  {path: 'deposit', component: DepositComponent},
  {path: 'withdraw/:id', component: WithdrawComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
