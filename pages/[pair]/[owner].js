import { useRouter } from "next/router";
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Wallet from '../../components/Wallet'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'

import { LockerContract, LockerABI } from '../../components/contracts/Locker'
import { USDC, USDCABI } from '../../components/contracts/USDC'
import { PAIRABI } from '../../components/contracts/Pair'

const Index = () => {
    const router = useRouter();
    const { pair, owner } = router.query;

    const [amt, setAmt] = useState("");
    const [time, setTime] = useState();
    const [addr, setAddr] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [bal, setBal] = useState(0);
    const [pBal, setPBal] = useState(0);
    const [lockedArray, setLockedArray] = useState([]);
    const [t, setT] = useState(0.0);
    const [name, setName] = useState('');

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const now = new Date((new Date().getTime()) + (time*86400000));

    async function lock(i) {
        if(active) {
        const ca = new library.eth.Contract(LockerABI, LockerContract);
        try {
            await ca.methods.extendLock(pair, time, i).send({from: account});
        } catch { setInvalid(true) }
        }
    }

    async function unlock(a, i) {
        if(active) {
            const ca = new library.eth.Contract(LockerABI, LockerContract);
            try {
                await ca.methods.withdraw(pair, a, i).send({from: account});
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

    async function getTotalSupply() {
        if(active) {
            const token = new library.eth.Contract(PAIRABI, pair);
            setT(await token.methods.totalSupply().call({from: account}));
        }
    }

    async function getName() {
        if(active) {
            const token = new library.eth.Contract(PAIRABI, pair);
            setName(await token.methods.name().call({from: account}));
        }
    }

    useEffect(() => {
        if(active) {
            const loadLocks = async () => {
                const ca = new library.eth.Contract(LockerABI, LockerContract);
                setLockedArray(await ca.methods.getLocks(owner, pair).call({from: account}))
            }
            loadLocks();
            getTotalSupply();
            getName();
        }
    }, [active])

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-bl bg-[#f2f2f2] font-Main w-full">
            <Head>
                <title>DreamLocker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col">
                <div className='flex w-full items-center justify-between py-4 px-8 mt-4'>
                    <div className='flex'>
                        <h1 className='text-4xl font-light text-white'>Pools</h1>
                    </div>
                    <Wallet/>
                </div>
                
                <div className="px-8">
                    <div className='flex'>
                        {/*<button className='p-4 my-4 bg-white rounded-2xl' onClick={approveToken}>approve token</button>*/}
                        </div>
                        <div className='flex flex-col self-center w-full mt-12 bg-gradient-to-r from-[#4c1860] to-[#5b1a5b] rounded-xl'>
                        <h1 className='bg-gradient-to-r from-[#ffffff] to-[#ffddff] bg-clip-text text-transparent p-8 text-2xl font-bold self-center'>Locked Liquidity for {name}</h1>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center mt-2">
                        {active ? (
                            lockedArray.map((i, j) => (
                            <div className="flex flex-col w-full bg-gradient-to-br p-8 from-[#653877] to-[#342138] text-white rounded-xl mt-4 text-xs lg:text-base">
                                <div className="flex items-center">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M14 2a8 8 0 0 1 3.292 15.293A8 8 0 1 1 6.706 6.707 8.003 8.003 0 0 1 14 2zm-3 7H9v1a2.5 2.5 0 0 0-.164 4.995L9 15h2l.09.008a.5.5 0 0 1 0 .984L11 16H7v2h2v1h2v-1a2.5 2.5 0 0 0 .164-4.995L11 13H9l-.09-.008a.5.5 0 0 1 0-.984L9 12h4v-2h-2V9zm3-5a5.985 5.985 0 0 0-4.484 2.013 8 8 0 0 1 8.47 8.471A6 6 0 0 0 14 4z"></path></g></svg>
                                    <h1 className="font-bold text-[#ffffff] text-xl ml-1">UNI-V2 Pair</h1>
                                </div>
                                <div className="flex justify-between mt-6">
                                    <h1>Owner:</h1>
                                    <h1 className="font-bold underline"><Link href={"https://etherscan.io/address/" + owner}>{owner.substring(0,4) + '...' + owner.substring(owner.length - 4, owner.length)}</Link></h1>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <h1>Amount:</h1>
                                    <h1 className="font-bold">{library.utils.fromWei(i[0], 'ether')} UNI-V2</h1>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <h1>Unlocks:</h1>
                                    <h1 className="font-bold">{new Date((i[1]*1000)).toUTCString()}</h1>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <h1>Percentage:</h1>
                                    <h1 className="font-bold">{((i[0] / t)*100).toFixed(4)}%</h1>
                                </div>
                                {/*<div className='flex'>
                                    <button className='p-4 mt-4 bg-[#7a479f] rounded-2xl w-1/2 text-white' onClick={approveUSDC}>Approve USDC</button>
                                    <button className='p-4 mt-4 bg-[#7a479f] rounded-2xl w-1/2 ml-6 text-white' onClick={() => lock(j)}>Extend Lock</button>
                                </div>*/}
                            </div>  
                            ))
                        ) : <Wallet/>}
                    </div>
                </div>

            </main>

        </div>
    )
}

export default Index