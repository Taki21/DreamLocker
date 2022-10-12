import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Wallet from '../components/Wallet'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'

import { LockerContract, LockerABI } from '../components/contracts/Locker'
import { USDC, USDCABI } from '../components/contracts/USDC'
import { PAIRABI } from '../components/contracts/Pair'

const Index = () => {
    const [amt, setAmt] = useState("");
    const [time, setTime] = useState();
    const [addr, setAddr] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [bal, setBal] = useState(0);
    const [pBal, setPBal] = useState(0);

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const now = new Date((new Date().getTime()) + (time*86400000));

    async function lock() {
        if(active) {
        const ca = new library.eth.Contract(LockerABI, LockerContract);
        try {
            await ca.methods.lockTokens(addr, library.utils.toWei(amt), time).send({from: account});
        } catch { setInvalid(true) }
        }
    }

    async function approve() {
        if(active) {
        const token = new library.eth.Contract(PAIRABI, addr);
        await token.methods.approve("0x4EDE75D310084674e9882E7e45fFB2EE00fD7681", library.utils.toWei(amt)).send({from: account});
        }
    }

    async function approveUSDC() {
        if(active) {
        const token = new library.eth.Contract(USDCABI, USDC);
        await token.methods.approve("0x4EDE75D310084674e9882E7e45fFB2EE00fD7681", "69000000").send({from: account});
        }
    }

    useEffect(() => {
        if(active) {
        const balances = async () => {
            try {
            const token = new library.eth.Contract(PAIRABI, addr);
            let b = await token.methods.balanceOf(account).call({from: account});
            setBal(b);
            setPBal(library.utils.fromWei(b, 'ether'));
            setInvalid(false);
            } catch { 
            setInvalid(true);
            setBal(0);
            setPBal(0);
            }
        }
        balances();
        }
    }, [addr])

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-bl font-Main w-full">
            <Head>
                <title>DreamLocker</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <main className="flex flex-col">
                <div className='flex w-full items-center justify-between py-4 px-8 mt-4'>
                    <div className='flex'>
                        <h1 className='text-4xl font-light text-white'>Pools</h1>
                    </div>
                    <Wallet/>
                </div>

                <div className='w-full flex px-8'>
                    <div className='flex flex-col self-center w-full mt-12 bg-[#19181A] rounded-xl'>
                        <h1 className='bg-gradient-to-r from-[#4c1860] to-[#8d298d] bg-clip-text text-transparent p-8 pb-0 text-2xl font-bold self-center'>Search My Pools</h1>        
                        <div className="flex flex-col p-4 pb-6 self-center bg-[#19181A] rounded-lg font-Main text-[#585858] w-full">
                            <h1 className='flex self-center'>Retrieve My Locked Liquidity</h1>
                            {invalid ? <h1 className='flex self-center text-[#b12b2b] font-bold bg-red-100 px-4 py-1 my-1 rounded-lg'>Invalid Pair Address!</h1> : <></>}
                            <input onChange={(e) => setAddr(e.target.value)} placeholder="Input Address Here" className="bg-[#120f14] mt-2 py-4 pr-2 outline-none focus:outline-none text-[#ffffff] w-full text-center text-xs rounded-xl font-bold"/>
                            <Link href={'/' + addr}>
                                <a className='py-3 my-3 mb-0 text-white bg-[#7a479f] rounded-2xl self-center w-full text-center'>View Token Details</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Index