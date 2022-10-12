import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";

function Sidebar() {

    const router = useRouter();
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    async function disconnect() {
        try {
            deactivate()
            localStorage.setItem('isWalletConnected', false)
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div className="flex flex-col items-center justify-between w-72 min-h-screen py-2">
            <div className="flex self-start m-4">
                <img src="/logo.png" className="w-12" />
                <h1 className="self-center pl-4 pr-2 text-2xl font-black text-white font-Main">DreamLocker</h1>
            </div>
            
            <div className="flex flex-col self-start w-full px-4 text-white mb-[28rem] font-Main">
                <Link href="/">
                    <a className={router.pathname == '/' ? 'flex bg-gradient-to-r from-[#4c1860] to-[#8d298d] pl-2 py-2 rounded-lg w-full' : 'flex pl-2 py-2'}><svg className="mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.443 1.991a60.17 60.17 0 00-2.725.802.454.454 0 00-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 008 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 002.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 00-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z" clip-rule="evenodd"></path><path d="M9.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path><path d="M7.411 8.034a.5.5 0 01.493-.417h.156a.5.5 0 01.492.414l.347 2a.5.5 0 01-.493.585h-.835a.5.5 0 01-.493-.582l.333-2z"></path></svg>Locker</a>
                </Link>
                <Link href="/staking" className="my-8">
                    <a className={router.pathname == '/staking' ? 'flex bg-gradient-to-r from-[#4c1860] to-[#8d298d] pl-2 py-2 rounded-lg w-full my-8' : 'flex my-8 pl-2 py-2'}><svg className="mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M12,22c3.976,0,8-1.374,8-4v-4v-4V6c0-2.626-4.024-4-8-4S4,3.374,4,6v4v4v4C4,20.626,8.024,22,12,22z M12,20 c-3.722,0-6-1.295-6-2v-1.268C7.541,17.57,9.777,18,12,18s4.459-0.43,6-1.268V18C18,18.705,15.722,20,12,20z M12,4 c3.722,0,6,1.295,6,2s-2.278,2-6,2S6,6.705,6,6S8.278,4,12,4z M6,8.732C7.541,9.57,9.777,10,12,10s4.459-0.43,6-1.268V10 c0,0.705-2.278,2-6,2s-6-1.295-6-2V8.732z M6,12.732C7.541,13.57,9.777,14,12,14s4.459-0.43,6-1.268V14c0,0.705-2.278,2-6,2 s-6-1.295-6-2V12.732z"></path></svg> Staking</a>
                </Link>
                <Link href="/pools">
                    <a className={router.pathname == '/pools' ? 'flex bg-gradient-to-r from-[#4c1860] to-[#8d298d] pl-2 py-2 rounded-lg w-full' : "flex py-2 pl-2"}><svg className="mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path fill-rule="nonzero" d="M14 2a8 8 0 0 1 3.292 15.293A8 8 0 1 1 6.706 6.707 8.003 8.003 0 0 1 14 2zm-4 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm1 1v1h2v2H9a.5.5 0 0 0-.09.992L9 13h2a2.5 2.5 0 1 1 0 5v1H9v-1H7v-2h4a.5.5 0 0 0 .09-.992L11 15H9a2.5 2.5 0 1 1 0-5V9h2zm3-5a5.985 5.985 0 0 0-4.484 2.013 8 8 0 0 1 8.47 8.471A6 6 0 0 0 14 4z"></path></g></svg>Pools</a>
                </Link>
                <Link href="https://proofofdreams.xyz/">
                    <a className="flex py-2 pl-2 mt-8"><svg className="mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M8.003,15c0-1.103,0.897-2,2-2h4c1.103,0,2,0.897,2,2v5h3.001l-0.001-8.586l-7-7l-7,7V20h3V15z"></path><path fill="none" d="M10.003 15H14.003V20H10.003z"></path><path d="M5.003,22h4h6h4c1.103,0,2-0.897,2-2v-9c0-0.265-0.105-0.52-0.293-0.707l-8-8c-0.391-0.391-1.023-0.391-1.414,0l-8,8 C3.108,10.48,3.003,10.735,3.003,11v9C3.003,21.103,3.9,22,5.003,22z M10.003,20v-5h4v5H10.003z M5.003,11.414l7-7l7,7L19.004,20 h-3.001v-5c0-1.103-0.897-2-2-2h-4c-1.103,0-2,0.897-2,2v5h-3V11.414z"></path></svg>Home</a>
                </Link>
            </div>

            <div className="flex self-start p-4 font-Main">
                <button onClick={disconnect} className="text-white rounded-lg w-24 py-2 bg-[#7e3393] hover:bg-[#461a56] transition-all justify-center">Logout</button>
            </div>
        </div>
    );
}

export default Sidebar