// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { StyledEngineProvider } from '@mui/material';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { GlobalStyle } from './components';
import { routes } from './routes';
import { ThemeProvider } from './theme';
import { fetcher } from './utils';

function Root() {
  return (
    <Suspense fallback='...'>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <SWRConfig value={{ fetcher }}>
            <GlobalStyle />
            <RouterProvider router={routes} />
          </SWRConfig>
        </ThemeProvider>
      </StyledEngineProvider>
    </Suspense>
  );
}

export default Root;
