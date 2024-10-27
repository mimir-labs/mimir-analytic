// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createBrowserRouter, Navigate } from 'react-router-dom';

import BaseContainer from './containers/BaseContainer';
import PageAccounts from './pages/accounts';
import PageDashboard from './pages/dashboard';
import PageDashboardV2 from './pages/dashboard/v2';
import PageProxy from './pages/proxy';
import PageTransactionDaily from './pages/transaction-daily';
import PageTransactions from './pages/transactions';
import PageTransactionsV2 from './pages/transactions/v2';

export const routes = createBrowserRouter([
  {
    element: <BaseContainer />,
    children: [
      {
        index: true,
        element: <PageDashboard />
      },
      {
        path: '/dashboard',
        element: <PageDashboardV2 />
      },
      {
        path: '/proxy',
        element: <PageProxy />
      },
      {
        path: '/transactions-v2',
        element: <PageTransactionsV2 />
      },
      {
        path: '/accounts',
        element: <PageAccounts />
      },
      {
        path: '/transactions',
        element: <PageTransactions />
      },
      {
        path: '/transaction-daily',
        element: <PageTransactionDaily />
      }
    ]
  },
  { element: <Navigate replace to='/' />, path: '*' }
]);
