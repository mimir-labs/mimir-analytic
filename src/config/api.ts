// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

type Endpoint = {
  name: string;
  wsUrl: string;
  icon: string;
  tokenIcon: string;
  chainSS58: number;
  genesisHash?: string;
  serviceUrl?: string;
  explorerUrl?: string;
};

export const localEndpoint: Endpoint = { icon: '/chain-icons/Mimir.svg', tokenIcon: '/token-icons/Mimir.svg', name: 'Development', wsUrl: 'ws://127.0.0.1:9944/', chainSS58: 42 };
export const devEndpoints: Endpoint[] = [
  {
    icon: '/chain-icons/Mimir.svg',
    tokenIcon: '/token-icons/Mimir.svg',
    name: 'Mimir',
    wsUrl: 'wss://dev-ws.mimir.global/',
    chainSS58: 42,
    genesisHash: '0xc47e0ed91f4362642787756a15618b5cb558a3952187c6dfb3fb8e9db5128678',
    serviceUrl: 'https://dev-api.mimir.global/'
  }
];
export const testnetEndpoints: Endpoint[] = [
  {
    icon: '/chain-icons/Rococo.png',
    tokenIcon: '/token-icons/Rococo.png',
    name: 'Rococo',
    wsUrl: 'wss://rococo-rpc.polkadot.io/',
    chainSS58: 42,
    genesisHash: '0x6408de7737c59c238890533af25896a2c20608d8b380bb01029acb392781063e',
    serviceUrl: 'https://rococo-api.mimir.global/',
    explorerUrl: 'https://rococo.subscan.io/'
  }
];
export const polkadotEndpoints: Endpoint[] = [
  {
    icon: '/chain-icons/Polkadot.png',
    tokenIcon: '/token-icons/Polkadot.png',
    name: 'Polkadot',
    wsUrl: 'wss://polkadot.api.onfinality.io/public-ws/',
    chainSS58: 0,
    genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    serviceUrl: 'https://polkadot-api.mimir.global/',
    explorerUrl: 'https://polkadot.subscan.io/'
  },
  {
    icon: '/chain-icons/assethub.svg',
    tokenIcon: '/token-icons/Polkadot.png',
    name: 'AssetHub',
    wsUrl: 'wss://polkadot-asset-hub-rpc.polkadot.io/',
    chainSS58: 0,
    genesisHash: '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f',
    serviceUrl: 'https://assethub-polkadot-api.mimir.global/',
    explorerUrl: 'https://assethub-polkadot.subscan.io/'
  }
];
export const kusamaEndpoints: Endpoint[] = [
  {
    icon: '/chain-icons/Kusama.png',
    tokenIcon: '/token-icons/Kusama.png',
    name: 'Kusama',
    wsUrl: 'wss://kusama.api.onfinality.io/public-ws/',
    chainSS58: 2,
    genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
    serviceUrl: 'https://kusama-api.mimir.global/',
    explorerUrl: 'https://kusama.subscan.io/'
  }
];
export const paseoEndpoints: Endpoint[] = [
  {
    icon: '/chain-icons/Paseo.png',
    tokenIcon: '/token-icons/Paseo.png',
    name: 'Paseo',
    wsUrl: 'wss://paseo.rpc.amforc.com/',
    chainSS58: 42,
    genesisHash: '0x77afd6190f1554ad45fd0d31aee62aacc33c6db0ea801129acb813f913e0764f',
    serviceUrl: 'https://paseo-api.mimir.global/'
  }
];

export const allEndpoints = devEndpoints.concat(testnetEndpoints).concat(polkadotEndpoints).concat(kusamaEndpoints).concat(paseoEndpoints);

export function findEndpoint(genesisHash: string): Endpoint {
  return allEndpoints.find((item) => item.genesisHash === genesisHash) || localEndpoint;
}
