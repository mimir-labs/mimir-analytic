// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

export interface AccountData {
  id: number;
  address: HexString;
  name?: string | null;
  type: 'pure' | 'multisig';
  isMimir: boolean;
  network?: HexString | null;
  threshold: number;
  createdAt: string;
  updatedAt: string;
  utm_campaign: string | null;
  utm_medium: string | null;
  utm_source: string | null;
}
