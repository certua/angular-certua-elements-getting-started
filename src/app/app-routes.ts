









import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FnolComponent } from './insurance/fnol/fnol.component';

import { QuickQuoteComponent } from './insurance/quick-quote/quick-quote.component';


import { OverviewComponent } from './insurance/overview/overview.component';


export const routes: Routes = [
  {
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
      },

      {
        path: 'overview-insurance',
        loadComponent: () => import('./insurance/insurance-overview/insurance-overview.component').then(m => m.InsuranceOverviewComponent),
      },
      {
        path: 'open-banking/components',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'connect',
          },
          {
            path: 'connect',
            loadComponent: () => import('./open-banking/connect/connect.component').then(m => m.ConnectComponent),
          },
          {
            path: 'manage-connections',
            loadComponent: () => import('./open-banking/manage-connections/manage-connections.component').then(m => m.ManageConnectionsComponent),
          },
          {
            path: 'transactions',
            loadComponent: () => import('./open-banking/transactions/transactions.component').then(m => m.TransactionsComponent),
          },
          {
            path: 'cashflow',
            loadComponent: () => import('./open-banking/cashflow/cashflow.component').then(m => m.CashflowComponent),
          },
          {
            path: 'account-summary',
            loadComponent: () => import('./open-banking/account-summary/account-summary.component').then(m => m.AccountSummaryComponent),
          },
        ],
      },
      {
        path: 'insurance/components',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'introduction',
          },
          {
            path: 'introduction',
            loadComponent: () => import('./insurance/insurance-overview/insurance-overview.component').then(m => m.OverviewComponent),
          },
          {
            path: 'quote-and-buy',
            loadComponent: () => import('./insurance/quote-and-buy/quote-and-buy.component').then(m => m.QuoteAndBuyComponent),
          },
          // {
          //   path: 'fnol',
          //   component: FnolComponent,
          // },
          {
            path: 'claims',
            loadComponent: () => import('./insurance/claims/claims.component').then(m => m.ClaimsComponent),
          },
          // {
          //   path: 'quick-quote',
          //   component: QuickQuoteComponent,
          // },
          {
            path: 'login',
            loadComponent: () => import('./insurance/login/login.component').then(m => m.LoginComponent),
          },
          {
            path: 'quotes-list',
            loadComponent: () => import('./insurance/quote-list/quote-list.component').then(m => m.QuoteListComponent),
          },
          {
            path: 'documents',
            loadComponent: () => import('./insurance/documents/documents.component').then(m => m.DocumentsComponent),
          },
          {
            path: 'policies-list',
            loadComponent: () => import('./insurance/policies-list/policies-list.component').then(m => m.PoliciesListComponent),
          },
          {
            path: 'view-policy',
            children: [
              {
                path: '',
                loadComponent: () => import('./insurance/view-policy/view-policy.component').then(m => m.ViewPolicyComponent),
              },
              {
                path: ':id',
                loadComponent: () => import('./insurance/view-policy/view-policy.component').then(m => m.ViewPolicyComponent),
              },
            ],
          },
          {
            path: 'view-policy2',
            children: [
              {
                path: '',
                loadComponent: () => import('./insurance/view-policy-v2/view-policy-v2.component').then(m => m.ViewPolicyV2Component),
              },
              {
                path: ':id',
                loadComponent: () => import('./insurance/view-policy-v2/view-policy-v2.component').then(m => m.ViewPolicyV2Component),
              },
            ],
          },
          {
            path: 'manage-policy',
            loadComponent: () => import('./insurance/view-policy-v2/view-policy-v2.component').then(m => m.ViewPolicyV2Component),
          },
          {
            path: 'component-overview',
            loadComponent: () => import('./insurance/insurance-overview/insurance-overview.component').then(m => m.OverviewComponent),
          },
        ],
      },
    ],
  },
];
