// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

export type Endpoint = {
  key: string;
  name: string;
  wsUrl: string;
  icon: string;
  tokenIcon: string;
  ss58Format: number;
  genesisHash: HexString;
  explorerUrl?: string;
  proposalApi?: string;
  subsquareUrl?: string;
  identityNetwork?: string;
};

export const polkadotEndpoints: Endpoint[] = [
  {
    key: 'polkadot',
    icon: '/chain-icons/Polkadot.png',
    tokenIcon: '/token-icons/Polkadot.png',
    name: 'Polkadot',
    wsUrl: 'wss://polkadot.api.onfinality.io/public-ws',
    genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    ss58Format: 0,
    explorerUrl: 'https://polkadot.subscan.io/',
    proposalApi: 'https://polkadot.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://polkadot.subsquare.io/',
    identityNetwork: 'people-polkadot'
  },
  {
    key: 'assethub-polkadot',
    icon: '/chain-icons/assethub.svg',
    tokenIcon: '/token-icons/Polkadot.png',
    name: 'AssetHub',
    wsUrl: 'wss://polkadot-asset-hub-rpc.polkadot.io',
    genesisHash: '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f',
    ss58Format: 0,
    explorerUrl: 'https://assethub-polkadot.subscan.io/',
    identityNetwork: 'people-polkadot'
  },
  // {
  //   icon: '/chain-icons/bridgehub.svg',
  //   tokenIcon: '/token-icons/Polkadot.png',
  //   name: 'BridgeHub',
  //   wsUrl: 'wss://polkadot-bridge-hub-rpc.polkadot.io/',
  //   genesisHash: '0xdcf691b5a3fbe24adc99ddc959c0561b973e329b1aef4c4b22e7bb2ddecb4464',
  //   explorerUrl: 'https://bridgehub-polkadot.subscan.io/'
  // },
  {
    key: 'coretime-polkadot',
    icon: '/chain-icons/coretime-polkadot.webp',
    tokenIcon: '/token-icons/Polkadot.png',
    name: 'Coretime',
    wsUrl: 'wss://polkadot-coretime-rpc.polkadot.io',
    genesisHash: '0xefb56e30d9b4a24099f88820987d0f45fb645992416535d87650d98e00f46fc4',
    ss58Format: 0,
    explorerUrl: 'https://coretime-polkadot.subscan.io/',
    identityNetwork: 'people-polkadot'
  },
  {
    key: 'collectives-polkadot',
    icon: '/chain-icons/collectives.svg',
    tokenIcon: '/token-icons/Polkadot.png',
    name: 'Collectives',
    wsUrl: 'wss://polkadot-collectives-rpc.polkadot.io',
    genesisHash: '0x46ee89aa2eedd13e988962630ec9fb7565964cf5023bb351f2b6b25c1b68b0b2',
    ss58Format: 0,
    explorerUrl: 'https://collectives-polkadot.subscan.io/',
    proposalApi: 'https://collectives.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://collectives.subsquare.io/',
    identityNetwork: 'people-polkadot'
  },
  {
    key: 'people-polkadot',
    icon: '/chain-icons/people.svg',
    tokenIcon: '/token-icons/Polkadot.png',
    name: 'People',
    wsUrl: 'wss://polkadot-people-rpc.polkadot.io',
    genesisHash: '0x67fa177a097bfa18f77ea95ab56e9bcdfeb0e5b8a40e46298bb93e16b6fc5008',
    ss58Format: 0,
    explorerUrl: 'https://people-polkadot.subscan.io/'
  },
  {
    key: 'bifrost-polkadot',
    icon: '/chain-icons/bifrost-polkadot.png',
    tokenIcon: '/token-icons/bnc.png',
    name: 'Bifrost',
    wsUrl: 'wss://hk.p.bifrost-rpc.liebi.com/ws',
    genesisHash: '0x262e1b2ad728475fd6fe88e62d34c200abe6fd693931ddad144059b1eb884e5b',
    ss58Format: 0,
    explorerUrl: 'https://bifrost.subscan.io/',
    proposalApi: 'https://bifrost.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://bifrost.subsquare.io/'
  },
  {
    key: 'crust-polkadot',
    icon: '/chain-icons/crust-polkadot.svg',
    tokenIcon: '/token-icons/cru.svg',
    name: 'Crust',
    wsUrl: 'wss://crust-parachain.crustapps.net',
    genesisHash: '0x4319cc49ee79495b57a1fec4d2bd43f59052dcc690276de566c2691d6df4f7b8',
    ss58Format: 88,
    explorerUrl: 'https://crust-parachain.subscan.io/'
  },
  {
    key: 'pendulum',
    icon: '/chain-icons/pendulum.svg',
    tokenIcon: '/token-icons/pen.png',
    name: 'Pendulum',
    wsUrl: 'wss://rpc-pendulum.prd.pendulumchain.tech',
    genesisHash: '0x5d3c298622d5634ed019bf61ea4b71655030015bde9beb0d6a24743714462c86',
    ss58Format: 56,
    explorerUrl: 'https://pendulum.subscan.io/'
  },
  {
    key: 'acala',
    icon: '/chain-icons/Acala.svg',
    tokenIcon: '/token-icons/ACA.svg',
    name: 'Acala',
    wsUrl: 'wss://acala-rpc-0.aca-api.network',
    genesisHash: '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c',
    ss58Format: 10,
    explorerUrl: 'https://acala.subscan.io/',
    proposalApi: 'https://acala.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://acala.subsquare.io/'
  },
  {
    key: 'phala',
    icon: '/chain-icons/phala.svg',
    tokenIcon: '/token-icons/PHA.svg',
    name: 'Phala',
    wsUrl: 'wss://phala-rpc.dwellir.com',
    genesisHash: '0x1bb969d85965e4bb5a651abbedf21a54b6b31a21f66b5401cc3f1e286268d736',
    ss58Format: 30,
    explorerUrl: 'https://phala.subscan.io/',
    proposalApi: 'https://phala.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://phala.subsquare.io/'
  },
  {
    key: 'hydration',
    icon: '/chain-icons/hydration.svg',
    tokenIcon: '/token-icons/HDX.svg',
    name: 'Hydration',
    wsUrl: 'wss://rpc.hydradx.cloud',
    genesisHash: '0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d',
    ss58Format: 63,
    explorerUrl: 'https://hydration.subscan.io/',
    proposalApi: 'https://hydration.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://hydration.subsquare.io/'
  },
  {
    key: 'nexus',
    icon: '/chain-icons/nexus.webp',
    tokenIcon: '/token-icons/BRIDGE.webp',
    name: 'Hyperbridge (Nexus)',
    wsUrl: 'wss://hyperbridge-nexus-rpc.blockops.network',
    genesisHash: '0x61ea8a51fd4a058ee8c0e86df0a89cc85b8b67a0a66432893d09719050c9f540',
    ss58Format: 0,
    explorerUrl: 'https://nexus.statescan.io/'
  },
  {
    key: 'polimec',
    icon: '/chain-icons/polimec.svg',
    tokenIcon: '/token-icons/PLMC.webp',
    name: 'Polimec Polkadot',
    wsUrl: 'wss://rpc.polimec.org',
    genesisHash: '0x7eb9354488318e7549c722669dcbdcdc526f1fef1420e7944667212f3601fdbd',
    ss58Format: 41
  },
  {
    key: 'astar',
    icon: '/chain-icons/astar.webp',
    tokenIcon: '/token-icons/ASTR.webp',
    name: 'Astar',
    wsUrl: 'wss://rpc.astar.network',
    genesisHash: '0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6',
    ss58Format: 5,
    explorerUrl: 'https://astar.subscan.io/'
  }
];

export const kusamaEndpoints: Endpoint[] = [
  {
    key: 'kusama',
    icon: '/chain-icons/Kusama.png',
    tokenIcon: '/token-icons/Kusama.png',
    name: 'Kusama',
    wsUrl: 'wss://kusama.api.onfinality.io/public-ws',
    genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
    ss58Format: 2,
    explorerUrl: 'https://kusama.subscan.io/',
    proposalApi: 'https://kusama.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://kusama.subsquare.io/',
    identityNetwork: 'people-kusama'
  },
  {
    key: 'assethub-kusama',
    icon: '/chain-icons/assethub-kusama.svg',
    tokenIcon: '/token-icons/Kusama.png',
    name: 'AssetHub Kusama',
    wsUrl: 'wss://kusama-asset-hub-rpc.polkadot.io',
    genesisHash: '0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a',
    ss58Format: 2,
    explorerUrl: 'https://assethub-kusama.subscan.io/',
    identityNetwork: 'people-kusama'
  },
  // {
  //   icon: '/chain-icons/bridgehub-kusama.svg',
  //   tokenIcon: '/token-icons/Kusama.png',
  //   name: 'BridgeHub Kusama',
  //   wsUrl: 'wss://kusama-bridge-hub-rpc.polkadot.io',
  //   genesisHash: '0x00dcb981df86429de8bbacf9803401f09485366c44efbf53af9ecfab03adc7e5',
  //   explorerUrl: 'https://bridgehub-kusama.subscan.io/'
  // },
  {
    key: 'coretime-kusama',
    icon: '/chain-icons/coretime-kusama.webp',
    tokenIcon: '/token-icons/Kusama.png',
    name: 'Coretime Kusama',
    wsUrl: 'wss://kusama-coretime-rpc.polkadot.io',
    genesisHash: '0x638cd2b9af4b3bb54b8c1f0d22711fc89924ca93300f0caf25a580432b29d050',
    ss58Format: 2,
    explorerUrl: 'https://coretime-kusama.subscan.io/',
    identityNetwork: 'people-kusama'
  },
  {
    key: 'people-kusama',
    icon: '/chain-icons/people-kusama.svg',
    tokenIcon: '/token-icons/Kusama.png',
    name: 'People Kusama',
    wsUrl: 'wss://kusama-people-rpc.polkadot.io',
    genesisHash: '0xc1af4cb4eb3918e5db15086c0cc5ec17fb334f728b7c65dd44bfe1e174ff8b3f',
    ss58Format: 2,
    explorerUrl: 'https://people-kusama.subscan.io/'
  },
  {
    key: 'bifrost-kusama',
    icon: '/chain-icons/bifrost-kusama.png',
    tokenIcon: '/token-icons/bnc.png',
    name: 'Bifrost Kusama',
    wsUrl: 'wss://bifrost-rpc.liebi.com/ws',
    genesisHash: '0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed',
    ss58Format: 2,
    explorerUrl: 'https://bifrost.subscan.io/',
    proposalApi: 'https://bifrost.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://bifrost.subsquare.io/'
  },
  {
    key: 'amplitude',
    icon: '/chain-icons/amplitude.svg',
    tokenIcon: '/token-icons/ampe.svg',
    name: 'Amplitude',
    wsUrl: 'wss://rpc-amplitude.pendulumchain.tech',
    genesisHash: '0xcceae7f3b9947cdb67369c026ef78efa5f34a08fe5808d373c04421ecf4f1aaf',
    ss58Format: 57
  },
  {
    key: 'karura',
    icon: '/chain-icons/Karura.svg',
    tokenIcon: '/token-icons/KAR.png',
    name: 'Karura',
    wsUrl: 'wss://karura-rpc-0.aca-api.network',
    genesisHash: '0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b',
    ss58Format: 8,
    explorerUrl: 'https://karura.subscan.io/',
    proposalApi: 'https://karura.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://karura.subsquare.io/'
  },
  {
    key: 'khala',
    icon: '/chain-icons/khala.svg',
    tokenIcon: '/token-icons/PHA.svg',
    name: 'Khala',
    wsUrl: 'wss://khala-rpc.dwellir.com',
    genesisHash: '0xd43540ba6d3eb4897c28a77d48cb5b729fea37603cbbfc7a86a73b72adb3be8d',
    ss58Format: 30,
    explorerUrl: 'https://khala.subscan.io/',
    proposalApi: 'https://khala.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://khala.subsquare.io/'
  }
];
export const paseoEndpoints: Endpoint[] = [
  {
    key: 'paseo',
    icon: '/chain-icons/Paseo.png',
    tokenIcon: '/token-icons/Paseo.png',
    name: 'Paseo',
    ss58Format: 0,
    wsUrl: 'wss://paseo.rpc.amforc.com',
    genesisHash: '0x77afd6190f1554ad45fd0d31aee62aacc33c6db0ea801129acb813f913e0764f',
    explorerUrl: 'https://paseo.subscan.io/'
  }
];
export const westendEndpoints: Endpoint[] = [
  {
    key: 'westend',
    icon: '/chain-icons/Westend.webp',
    tokenIcon: '/token-icons/WND.webp',
    name: 'Westend',
    ss58Format: 42,
    wsUrl: 'wss://westend-rpc.dwellir.com',
    genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
    explorerUrl: 'https://westend.subscan.io/'
  },
  {
    key: 'assethub-westend',
    icon: '/chain-icons/assethub-westend.webp',
    tokenIcon: '/token-icons/WND.webp',
    name: 'AssetHub Westend',
    ss58Format: 42,
    wsUrl: 'wss://asset-hub-westend-rpc.dwellir.com',
    genesisHash: '0x67f9723393ef76214df0118c34bbbd3dbebc8ed46a10973a8c969d48fe7598c9',
    explorerUrl: 'https://assethub-westend.subscan.io/'
  },
  {
    key: 'assethub-next-westend',
    icon: '/chain-icons/assethub-westend.webp',
    tokenIcon: '/token-icons/WND.webp',
    name: 'AssetHub Next',
    ss58Format: 42,
    wsUrl: 'wss://westend-asset-hub-next-rpc.parity-chains-scw.parity.io',
    genesisHash: '0x6ddaae15f85a6a5035da7c842ba7a8a90c06d1f53d410a08d19fe899d9d9c7c8',
    explorerUrl: 'https://assethub-westend-next.subscan.io/'
  }
];

export const solochainEndpoints: Endpoint[] = [
  {
    key: 'vara',
    icon: '/chain-icons/vara.png',
    tokenIcon: '/token-icons/vara.png',
    name: 'Vara',
    wsUrl: 'wss://rpc.vara.network',
    genesisHash: '0xfe1b4c55fd4d668101126434206571a7838a8b6b93a6d1b95d607e78e6c53763',
    ss58Format: 137,
    explorerUrl: 'https://vara.subscan.io/',
    proposalApi: 'https://vara.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://vara.subsquare.io/'
  },
  {
    key: 'crust',
    icon: '/chain-icons/crust.svg',
    tokenIcon: '/token-icons/cru.svg',
    name: 'Crust',
    wsUrl: 'wss://rpc.crust.network',
    genesisHash: '0x8b404e7ed8789d813982b9cb4c8b664c05b3fbf433309f603af014ec9ce56a8c',
    ss58Format: 66,
    explorerUrl: 'https://crust.subscan.io/',
    proposalApi: 'https://crust.subsquare.io/api/gov2/referendums?simple=true',
    subsquareUrl: 'https://crust.subsquare.io/'
  },
  {
    key: 'avail',
    icon: '/chain-icons/avail.png',
    tokenIcon: '/token-icons/avail.png',
    name: 'Avail',
    wsUrl: 'wss://mainnet-rpc.avail.so/ws',
    genesisHash: '0xb91746b45e0346cc2f815a520b9c6cb4d5c0902af848db0a80f85932d2e8276a',
    ss58Format: 42,
    explorerUrl: 'https://avail.subscan.io/'
  },
  {
    key: 'avail-turing',
    icon: '/chain-icons/avail.png',
    tokenIcon: '/token-icons/avail.png',
    name: 'Avail Turing',
    wsUrl: 'wss://turing-rpc.avail.so/ws',
    genesisHash: '0xd3d2f3a3495dc597434a99d7d449ebad6616db45e4e4f178f31cc6fa14378b70',
    ss58Format: 42,
    explorerUrl: 'https://avail-turing.subscan.io/'
  },
  {
    key: 'zkverify-testnet',
    icon: '/chain-icons/zkverify.svg',
    tokenIcon: '/token-icons/ACME.svg',
    name: 'zkVerify Testnet',
    wsUrl: 'wss://testnet-rpc.zkverify.io',
    genesisHash: '0xc00425dcaa0a1bc5bf1163a2d69d7abb2cc6180de78b4e10297b31a4d9cc928a',
    ss58Format: 251,
    explorerUrl: 'https://zkverify-explorer.zeeve.net/'
  }
];

export const allEndpoints = polkadotEndpoints.concat(kusamaEndpoints).concat(paseoEndpoints).concat(westendEndpoints).concat(solochainEndpoints);

export function findEndpoint(genesisHash: string): Endpoint | undefined {
  return allEndpoints.find((item) => item.genesisHash === genesisHash);
}
