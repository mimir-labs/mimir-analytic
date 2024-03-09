// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Logo from '@mimir-analytic/assets/images/logo.png';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <Box
      sx={{
        zIndex: 1,
        position: 'fixed',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        px: { sm: 2.5, xs: 2 },
        height: 56,
        bgcolor: 'background.default',
        boxShadow: 'inset 0px -1px 0px #E6F0FF'
      }}
    >
      <Link to='/'>
        <img src={Logo} style={{ width: 87 }} />
      </Link>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link to='/'>Dashboard</Link>
        <Link to='/accounts'>accounts</Link>
        <Link to='/transactions'>transactions</Link>
      </Box>
    </Box>
  );
}

export default TopBar;
