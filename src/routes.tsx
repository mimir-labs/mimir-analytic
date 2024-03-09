// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createBrowserRouter, Navigate } from 'react-router-dom';

import BaseContainer from './containers/BaseContainer';
import PageAccounts from './pages/accounts';
import PageDashboard from './pages/dashboard';
import PageTransactions from './pages/transactions';

export const routes = createBrowserRouter([
  {
    element: <BaseContainer />,
    children: [
      {
        index: true,
        element: <PageDashboard />
      },
      {
        path: '/accounts',
        element: <PageAccounts />
      },
      {
        path: '/transactions',
        element: <PageTransactions />
      }
    ]
  },
  { element: <Navigate replace to='/' />, path: '*' }
]);
