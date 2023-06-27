import { LayoutComponent } from './layout/layout.component';
import { CashflowComponent } from './open-banking/cashflow/cashflow.component';
import { TransactionsComponent } from './open-banking/transactions/transactions.component';
import { ManageConnectionsComponent } from './open-banking/manage-connections/manage-connections.component';
import { ConnectComponent } from './open-banking/connect/connect.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSummaryComponent } from './open-banking/account-summary/account-summary.component';

const routes: Routes = [
  {
    component: LayoutComponent,
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'components',
        children: [
          {
            path: 'connect',
            component: ConnectComponent,
          },
          {
            path: 'manage-connections',
            component: ManageConnectionsComponent,
          },
          {
            path: 'transactions',
            component: TransactionsComponent,
          },
          {
            path: 'cashflow',
            component: CashflowComponent,
          },
          {
            path: 'account-summary',
            component: AccountSummaryComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
