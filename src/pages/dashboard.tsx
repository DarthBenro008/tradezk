import { useWeb3ModalProvider, useWeb3ModalAccount,useWeb3Modal } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits } from 'ethers'

export default function Dashboard(){

    const { address, chainId, isConnected } = useWeb3ModalAccount()

    return (
        <div>
            Dashboard <br/>
            {address}
        </div>
    )
    
}