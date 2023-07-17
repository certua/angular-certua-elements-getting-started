import { QuoteListComponent } from './insurance/quote-list/quote-list.component';
import { LoginComponent } from './onboarding/login/login.component';
import { ViewPolicyComponent } from './insurance/view-policy/view-policy.component';
import { LayoutComponent } from './layout/layout.component';
import { CashflowComponent } from './open-banking/cashflow/cashflow.component';
import { TransactionsComponent } from './open-banking/transactions/transactions.component';
import { ManageConnectionsComponent } from './open-banking/manage-connections/manage-connections.component';
import { ConnectComponent } from './open-banking/connect/connect.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSummaryComponent } from './open-banking/account-summary/account-summary.component';
import { QuoteAndBuyComponent } from './insurance/quote-and-buy/quote-and-buy.component';
import { FnolComponent } from './insurance/fnol/fnol.component';
import { ClaimsComponent } from './insurance/claims/claims.component';
import { QuickQuoteComponent } from './insurance/quick-quote/quick-quote.component';
import { PoliciesListComponent } from './insurance/policies-list/policies-list.component';
import { ViewPolicyV2Component } from './insurance/view-policy-v2/view-policy-v2.component';

export const routes: Routes = [
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
            path: '',
            pathMatch: 'full',
            redirectTo: 'connect',
          },
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
          {
            path: 'quote-and-buy',
            component: QuoteAndBuyComponent,
          },
          {
            path: 'fnol',
            component: FnolComponent,
          },
          {
            path: 'claims',
            component: ClaimsComponent,
          },
          {
            path: 'quick-quote',
            component: QuickQuoteComponent,
          },
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'quotes-list',
            component: QuoteListComponent,
          },
          {
            path: 'policies-list',
            component: PoliciesListComponent,
          },
          {
            path: 'view-policy',
            children: [
              {
                path: '',
                component: ViewPolicyComponent,
              },
              {
                path: ':id',
                component: ViewPolicyComponent,
              },
            ],
          },
          {
            path: 'manage-policy',
            component: ViewPolicyV2Component,
          },
        ],
      },
    ],
  },
];
