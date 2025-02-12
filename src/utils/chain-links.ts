// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';
import type { HexString } from '@polkadot/util/types';

import { allEndpoints } from '@mimir-analytic/config';
import { encodeAddress, isAddress } from '@polkadot/util-crypto';

export function accountExplorerLink(genesisHash?: string, value?: AccountId | AccountIndex | Address | HexString | string | null): string | undefined {
  const _value = value?.toString();

  if (_value && _value.length > 47 && isAddress(_value)) {
    const { explorerUrl, ss58Format } = allEndpoints.find((item) => item.genesisHash === genesisHash) || {};

    if (explorerUrl) {
      return `${explorerUrl}account/${encodeAddress(_value, ss58Format)}`;
    }
  }

  return undefined;
}
