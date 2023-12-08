"use client"

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'


const projectId = 'c7adab7c5dacb0600c2128b71a4dd349'


const mumbai = {
  chainId: 80001,
  name: 'Mumbai',
  currency: 'MATIC',
  explorerUrl: 'https://mumbai.polygonscan.com/',
  rpcUrl: 'https://rpc-mumbai.matic.today'
}


const metadata = {
  name: 'TradeZK',
  description: 'Decentralised P2P',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mumbai],
  projectId
})

export function Web3ModalProvider({ children }) {
  return children;
}