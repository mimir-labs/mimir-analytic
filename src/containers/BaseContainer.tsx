// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import TopBar from './TopBar';

function BaseContainer() {
  return (
    <>
      <TopBar />
      <Box sx={{ paddingTop: 6 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default BaseContainer;
