import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'balance',
    loadComponent: () =>
      import('./balance-page.component').then((m) => m.BalancePageComponent),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./transactions-page.component').then((m) => m.TransactionsPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
