import { LayoutComponent } from './layout/layout.component';
import { CashflowComponent } from './cashflow/cashflow.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ManageConnectionsComponent } from './manage-connections/manage-connections.component';
import { ConnectComponent } from './connect/connect.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSummaryComponent } from './account-summary/account-summary.component';

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
