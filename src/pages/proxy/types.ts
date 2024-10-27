// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

export type RelationType = {
  createdAt: string;
  delay: number;
  endAddress: HexString;
  endId: number;
  id: number;
  isMimir: boolean;
  proxyType: string;
  startAddress: HexString;
  startId: number;
  type: 'proxy' | 'multisig';
  updatedAt: string;
};
