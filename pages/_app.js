import '../styles/globals.css'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider) {
  return new Web3(provider)
} 

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className='bg-gradient-to-r from-[#1b191b] to-[#1b061b] h-screen overflow-hidden'>
        <Component {...pageProps} />
      </div>
    </Web3ReactProvider>
  )
}

export default MyApp
