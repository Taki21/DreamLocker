import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Wallet from '../components/Wallet'
import Web3 from 'web3'
import { useRouter } from 'next/router'
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
    const [stakeButton, setStakeButton] = useState(true);
    const [balance, setBalance] = useState(0);
    const [tokenAllowance, setTokenAllowance] = useState(0);
    const [stakeAmount, setStakeAmount] = useState(0);
    const [amount, setAmount] = useState("");
    const [tvl, setTvl] = useState(0);
    const [rewards, setRewards] = useState(0);
    const [currTx, setTx] = useState(false);

    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const router = useRouter();

    const POD = '0x2b4557869B9F6a5e77e1054E9657D00f1323C151';

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
            const token = new library.eth.Contract(PAIRABI, POD);
            await token.methods.approve(LockerContract, BigInt(amount*(10**18))).send({from: account}).on('transactionHash', (hash) => setTx(hash));
        }
    }

    async function approveUSDC() {
        if(active) {
        const token = new library.eth.Contract(USDCABI, USDC);
        await token.methods.approve(LockerContract, "69000000").send({from: account});
        }
    }

    async function stakeTokens() {
        const stakeContract = new library.eth.Contract(LockerABI, LockerContract);
        await stakeContract.methods.stake(BigInt(amount*(10**18))).send({from: account}).on('transactionHash', (hash) => setTx(hash));
    }

    async function unstakeTokens() {
        const stakeContract = new library.eth.Contract(LockerABI, LockerContract);
        await stakeContract.methods.unstake(BigInt(amount*(10**18))).send({from: account}).on('transactionHash', (hash) => setTx(hash));
    }

    async function claim() {
        const stakeContract = new library.eth.Contract(LockerABI, LockerContract);
        await stakeContract.methods.claim().send({from: account});
    }

    useEffect(() => {
        if(active) {
        const balances = async () => {
            try {
                const token = new library.eth.Contract(PAIRABI, POD);
                let b = await token.methods.balanceOf(account).call({from: account});
                const allowance = await token.methods.allowance(account, LockerContract).call({from: account});
                const locker = new library.eth.Contract(LockerABI, LockerContract);
                setStakeAmount(library.utils.fromWei(await locker.methods.balances(account).call({from: account}), 'ether'));
                setTokenAllowance(allowance);
                setBal(b);
                setPBal(library.utils.fromWei(b, 'ether'));
                setInvalid(false);
                setRewards(await locker.methods.amountEarned(account).call({from: account}));
                setTvl(library.utils.fromWei(await locker.methods.totalStaked().call({from: account}), 'ether'));
            } catch { 
                setInvalid(true);
                setBal(0);
                setPBal(0);
            }
        }
        balances();
        }
        console.log(BigInt(amount*(10**18)));
    }, [active, bal])

    return (
        <div className="flex flex-col min-h-screen w-full bg-gradient-to-bl bg-[#f2f2f2] font-Main">
            <Head>
                <title>DreamLocker</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <main className="flex flex-col">
                <div className='flex w-full items-center justify-between py-4 px-8 mt-4'>
                    <div className='flex'>
                        <h1 className='text-4xl font-light text-white'>Staking</h1>
                    </div>
                    <Wallet/>
                </div>

                <div className='flex-col'>
                    <div className='2xl:flex justify-center mt-12 px-8'>
                        <div className="flex flex-col w-full px-4 bg-gradient-to-br from-[#653877] to-[#342138] rounded-xl py-6 text-white font-Main items-center mt-4 mr-4 justify-center">
                            <div className="flex">
                                <button onClick={() => setStakeButton(true)} className={stakeButton ? 'bg-gradient-to-r from-[#c5b9cb] to-[#ac82b5] p-2 rounded-lg mr-2' : 'p-2'}>Stake</button>
                                <button onClick={() => setStakeButton(false)} className={!stakeButton ? 'bg-gradient-to-r from-[#c5b9cb] to-[#ac82b5] p-2 rounded-lg ml-2' : 'p-2'}>Unstake</button>
                            </div>

                            <div className="flex flex-col bg-[#120f14] rounded-xl mt-8">
                                <div className="flex">
                                    <div className="bg-[#120f14] mt-2 py-2 pl-2 pr-4 rounded-l-xl flex items-center"><img src='/logo.png' className="h-4 w-6 md:h-8 md:w-8 lg:w-8 lg:h-8 ml-2"/></div>
                                    <div className="bg-[#120f14] py-2 mt-2 text-white font-Main">
                                        <button onClick={() => setAmount((bal/1000000000000000000))} className="bg-[#593393] pt-1 px-2 rounded-md">Max</button>
                                    </div>
                                    <input onChange={(e) => setAmount(e.target.value)} value={amount} placeholder="0.0" className="bg-[#120f14] mt-2 py-2 pr-2 w-full outline-none focus:outline-none text-[#ffffff] text-right text-2xl"/>
                                    <h1 className="pr-4 py-2 mt-2 text-2xl text-[#e9e9e9] bg-[#120f14] rounded-r-xl">POM2.0</h1>
                                </div>
                                <h1 className="self-end mb-2 mr-4 -mt-2 text-xs font-light text-[#b9b9b9]">Balance: {bal/(1000000000000000000)}</h1>
                            </div>

                            <h1 className="hidden lg:flex mt-6 text-xs font-light">Current Tx: <Link href={'https://etherscan.io/tx/' + currTx}><a>https://etherscan.io/tx/{currTx}</a></Link></h1>

                            <div>
                                <button onClick={stakeButton ? stakeTokens : unstakeTokens} className="mt-6 bg-[#6b4a77] hover:bg-[#583c62] transition-all px-4 py-3 rounded-xl">{stakeButton ? 'Stake' : 'Unstake'} POM2.0</button>
                            </div>
                            
                        </div>

                        <div className="flex flex-col self-center w-full">
                            <div className="flex flex-col bg-gradient-to-br from-[#653877] to-[#342138] py-4 pl-4 pr-6 rounded-lg mt-4 text-white font-Main">
                                <div className="flex">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M12,22c3.976,0,8-1.374,8-4v-4v-4V6c0-2.626-4.024-4-8-4S4,3.374,4,6v4v4v4C4,20.626,8.024,22,12,22z M12,20 c-3.722,0-6-1.295-6-2v-1.268C7.541,17.57,9.777,18,12,18s4.459-0.43,6-1.268V18C18,18.705,15.722,20,12,20z M12,4 c3.722,0,6,1.295,6,2s-2.278,2-6,2S6,6.705,6,6S8.278,4,12,4z M6,8.732C7.541,9.57,9.777,10,12,10s4.459-0.43,6-1.268V10 c0,0.705-2.278,2-6,2s-6-1.295-6-2V8.732z M6,12.732C7.541,13.57,9.777,14,12,14s4.459-0.43,6-1.268V14c0,0.705-2.278,2-6,2 s-6-1.295-6-2V12.732z"></path></svg>
                                    <h1 className="ml-2 text-2xl">Your POM2.0 Staked</h1>
                                </div>
                                <h1 className="mt-2 ml-1 xl:text-3xl font-bold">{stakeAmount} POM2.0</h1>
                            </div>

                            <div className="flex flex-col bg-gradient-to-br from-[#653877] to-[#342138] py-4 pl-4 pr-6 rounded-lg mt-4 text-white font-Main">
                                <div className="flex">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M12,22c3.976,0,8-1.374,8-4v-4v-4V6c0-2.626-4.024-4-8-4S4,3.374,4,6v4v4v4C4,20.626,8.024,22,12,22z M12,20 c-3.722,0-6-1.295-6-2v-1.268C7.541,17.57,9.777,18,12,18s4.459-0.43,6-1.268V18C18,18.705,15.722,20,12,20z M12,4 c3.722,0,6,1.295,6,2s-2.278,2-6,2S6,6.705,6,6S8.278,4,12,4z M6,8.732C7.541,9.57,9.777,10,12,10s4.459-0.43,6-1.268V10 c0,0.705-2.278,2-6,2s-6-1.295-6-2V8.732z M6,12.732C7.541,13.57,9.777,14,12,14s4.459-0.43,6-1.268V14c0,0.705-2.278,2-6,2 s-6-1.295-6-2V12.732z"></path></svg>
                                    <h1 className="ml-2 text-2xl">USDC Earned</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1 className="mt-2 ml-1 xl:text-3xl font-bold">${rewards/1000000} USDC</h1>
                                    <button onClick={claim} className=" bg-[#6b4a77] hover:bg-[#583c62] text-sm px-4 md:px-7 ml-5 rounded-xl transition-all font-bold">Claim</button>
                                </div>
                            </div>

                            <div className="flex flex-col bg-gradient-to-br from-[#653877] to-[#342138] py-4 pl-4 pr-6 rounded-lg mt-4 text-white font-Main">
                                <div className="flex">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M12,22c3.976,0,8-1.374,8-4v-4v-4V6c0-2.626-4.024-4-8-4S4,3.374,4,6v4v4v4C4,20.626,8.024,22,12,22z M12,20 c-3.722,0-6-1.295-6-2v-1.268C7.541,17.57,9.777,18,12,18s4.459-0.43,6-1.268V18C18,18.705,15.722,20,12,20z M12,4 c3.722,0,6,1.295,6,2s-2.278,2-6,2S6,6.705,6,6S8.278,4,12,4z M6,8.732C7.541,9.57,9.777,10,12,10s4.459-0.43,6-1.268V10 c0,0.705-2.278,2-6,2s-6-1.295-6-2V8.732z M6,12.732C7.541,13.57,9.777,14,12,14s4.459-0.43,6-1.268V14c0,0.705-2.278,2-6,2 s-6-1.295-6-2V12.732z"></path></svg>
                                    <h1 className="ml-2 text-2xl">Total Value Locked</h1>
                                </div>
                                <h1 className="mt-2 ml-1 xl:text-3xl font-bold">{tvl} POM2.0</h1>
                            </div>
                        </div>
                    </div>
                </div>
                
            </main>
        </div>
    )
}

export default Index