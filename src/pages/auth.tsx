import { useWeb3ModalProvider, useWeb3ModalAccount,useWeb3Modal } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Auth() {
    const router = useRouter()

    const { open } = useWeb3Modal()
    const { address, chainId, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    useEffect(() => {
        if(isConnected)
        router.push("/dashboard")
    }, [isConnected, router])

    return (
        <main className='min-h-screen bg-gray-100 px-4 py-8'>
            
            <button onClick={() => open()}>Open Connect Modal</button>
            {isConnected && 
            <div>
                {address}
            </div>}
        </main>
    )
}