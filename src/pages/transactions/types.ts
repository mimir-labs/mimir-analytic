// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

export enum CalldataStatus {
  Initialized = 0,
  Pending = 1,
  Success = 2,
  Failed = 3,
  MemberChanged = 4,
  Cancelled = 5
}

export interface TransactionData {
  address: HexString;
  name?: string | null;
  action?: string | null;
  calldataId: string;
  calldataUuid: string;
  genesisHash: HexString;
  callHash: HexString;
  status: CalldataStatus;
  blockTime: string;
  blockHeight?: number | null;
  extrinsicIndex?: number | null;
  website?: string | null;
  sendFromMimir: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum TransactionStatus {
  Initialized = 0,
  Pending = 1,
  Success = 2,
  Failed = 3,
  MemberChanged = 4,
  Cancelled = 5,
  AnnounceRemoved = 6,
  AnnounceReject = 7
}

export enum TransactionType {
  Unknown = 0,
  Multisig = 1,
  Proxy = 2,
  Announce = 3
}
export interface TransactionResponse {
  address: HexString;
  appName?: string | null;
  cancelling?: HexString | null;
  createdAt: string;
  createdBlock: string;
  createdExtrinsicHash: HexString;
  createdExtrinsicIndex: number;
  delegate?: HexString | null;
  hash: HexString;
  iconUrl?: string | null;
  id: number;
  method?: string | null;
  proxyType?: string | null;
  section?: string | null;
  sendFromMimir: boolean;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt: string;
  website?: string | null;
}
