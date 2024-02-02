import { Chain } from 'wagmi'

export const AreonTestnet = {
    id: 462,
    name: 'Areon Network Testnet',
    network: 'Areon Network Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'TAREA',
      symbol: 'TAREA',
    },
    rpcUrls: {
      public: { http: ['https://testnet-rpc.areon.network/'] },
      default: { http: ['https://testnet-rpc.areon.network/'] },
    },
    blockExplorers: {
      etherscan: { name: 'TAREA', url: 'https://areonscan.com/' },
      default: { name: 'TAREA', url: 'https://areonscan.com/' },
    },
  
  } as const satisfies Chain