import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Wallet from '../components/Wallet'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'

import { LockerContract, LockerABI } from '../components/contracts/Locker'
import { USDC, USDCABI } from '../components/contracts/USDC'
import { PAIRABI } from '../components/contracts/Pair'

const Home = () => {

  const [amt, setAmt] = useState("");
  const [time, setTime] = useState();
  const [addr, setAddr] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [bal, setBal] = useState(0);
  const [pBal, setPBal] = useState(0);
  const [popup, toggleAdrPopUp] = useState(true);

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
      await token.methods.approve(LockerContract, library.utils.toWei(amt)).send({from: account});
    }
  }

  async function approveUSDC() {
    if(active) {
      const token = new library.eth.Contract(USDCABI, USDC);
      await token.methods.approve(LockerContract, "69000000").send({from: account});
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

      <div onClick={() => toggleAdrPopUp(!popup)} className={popup ? "hidden" : "absolute h-screen w-screen backdrop-blur-lg flex justify-center items-center lg:w-[calc(100vw_-_18rem)] bg-black bg-opacity-50"}>
            <div onClick={(e) => e.stopPropagation()} className={popup ? "hidden" : "z-10 mx-8 flex flex-col justify-center p-4 mt-8 bg-[#19181A] rounded-lg font-Main text-[#585858] h-1/4 w-11/12 lg:w-1/2"}>
                <h1 className='flex self-center xl:text-3xl text-white'>Search for Token Pair Address</h1>
                {invalid ? <h1 className='flex self-center text-[#b12b2b] font-bold bg-red-100 px-4 py-1 my-1 rounded-lg'>Invalid Pair Address!</h1> : <></>}
                <input onChange={(e) => setAddr(e.target.value)} placeholder="Input Address Here" className="bg-[#120f14] mt-2 py-4 pr-2 outline-none focus:outline-none text-[#c8c8c8] w-full text-center text-xs 2xl:text-md rounded-xl font-bold"/>
            </div>
          </div>

      <main className="flex flex-col">
        <div className='flex w-full items-center justify-between py-4 px-8 mt-4'>
          <div className='flex'>
            <h1 className='text-4xl font-light text-white'>Locker</h1>
          </div>
          <Wallet/>
        </div>

        <div className='px-8 2xl:px-96'>
          <div className='flex flex-col self-center mt-12 bg-[#19181A] rounded-xl'>
            <h1 className='bg-gradient-to-r from-[#4c1860] to-[#8d298d] bg-clip-text text-transparent p-8 text-2xl font-bold self-center'>Lock Liquidity</h1>
            <div className='flex flex-col items-center justify-between mx-8 mb-4 text-[#585858]'>
              <div className='flex bg-[#120f14] items-center rounded-lg w-full justify-between h-20'>
                <div className='flex'>
                  <img src="logo.png" className='h-8 ml-4 mr-2'/>
                  <div className='flex flex-col'>
                    <h1 className='font-medium flex'>UNI-V2 <button className='ml-1 mb-1' onClick={() => toggleAdrPopUp(!popup)}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clip-rule="evenodd"></path></svg></button></h1>
                    <h1 className='text-xs'>Balance: {pBal}</h1>
                  </div>
                </div>
                <input onChange={(e) => setAmt(e.target.value)} value={amt} placeholder="0.0" className="bg-[#120f14] w-1/3 mr-4 py-3 outline-none focus:outline-none text-[#ffffff] text-right text-2xl"/>
              </div>
              
              <svg className='my-4' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>

              <div className='flex bg-[#120f14] items-center rounded-lg w-full justify-between h-20'>
                <div className='flex'>
                  <svg className='ml-4 mr-2' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path><path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path></svg>
                  <div className='flex flex-col'>
                    <h1 className='font-medium'>Duration</h1>
                    <h1 className='text-xs'>Minimum: 1 Day</h1>
                  </div>
                </div>
                <input type='number' min='1' onChange={(e) => setTime(e.target.value)} value={time} placeholder="0 Days" className="bg-[#120f14] w-1/3 mr-4 py-3 outline-none focus:outline-none text-[#ffffff] text-right text-2xl"/>
              </div>
            </div>

            <div className='flex flex-col mx-8 text-[#7f7f7f] font-medium'>
              <h1>Fee: 69 USDC</h1>
              <h1>Unlocks: {now.toUTCString()}</h1>
            </div>
            
            <div className='flex mx-8'>
              <button className='p-4 mt-4 bg-[#7a479f] rounded-2xl w-1/2 text-white' onClick={approveUSDC}>Approve USDC</button>
              <button className='p-4 mt-4 bg-[#7a479f] rounded-2xl w-1/2 ml-6 text-white' onClick={approve}>Approve LP</button>
            </div>
            <button className='p-4 my-4 mb-8 text-white bg-[#7a479f] rounded-2xl mx-8' onClick={lock}>Lock Tokens</button>

          </div>
        </div>

      </main>

    </div>
  )
}

export default Home
