import { InsuranceOverviewComponent } from './insurance/insurance-overview/insurance-overview.component';
import { QuoteListComponent } from './insurance/quote-list/quote-list.component';
import { LoginComponent } from './insurance/login/login.component';
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
import { OverviewComponent } from './insurance/overview/overview.component';
import { DocumentsComponent } from './insurance/documents/documents.component';

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
        path: 'overview-insurance',
        component: InsuranceOverviewComponent,
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
            path: 'introduction',
            component: OverviewComponent,
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
            path: 'documents',
            component: DocumentsComponent,
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
            path: 'view-policy2',
            children: [
              {
                path: '',
                component: ViewPolicyV2Component,
              },
              {
                path: ':id',
                component: ViewPolicyV2Component,
              },
            ],
          },
          {
            path: 'manage-policy',
            component: ViewPolicyV2Component,
          },
          {
            path: 'component-overview',
            component: OverviewComponent,
          },
        ],
      },
    ],
  },
];
