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
        <div className="flex flex-col items-center justify-between w-1/6 min-h-screen py-2">
            <div className="flex self-start m-4">
                <img src="/logo.png" className="w-12" />
                <h1 className="self-center pl-4 pr-2 text-3xl font-black text-white font-Main">DreamLocker</h1>
            </div>
            
            <div className="flex flex-col self-start w-full px-4 text-white mb-[28rem] font-Main">
                <Link href="/app">
                    <a className={router.pathname == '/' ? 'flex bg-gradient-to-r from-[#962771] to-[#461631] pl-2 py-2 rounded-lg w-full' : 'flex pl-2 py-2'}><svg className="mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.443 1.991a60.17 60.17 0 00-2.725.802.454.454 0 00-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 008 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 002.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 00-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z" clip-rule="evenodd"></path><path d="M9.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path><path d="M7.411 8.034a.5.5 0 01.493-.417h.156a.5.5 0 01.492.414l.347 2a.5.5 0 01-.493.585h-.835a.5.5 0 01-.493-.582l.333-2z"></path></svg>Locker</a>
                </Link>
                <Link href="/staking" className="my-8">
                    <a className={router.pathname == '/staking' ? 'flex bg-gradient-to-r from-[#274f96] to-[#162446] pl-2 py-2 rounded-lg w-full my-8' : 'flex my-8 pl-2 py-2'}><svg className="mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M12,22c3.976,0,8-1.374,8-4v-4v-4V6c0-2.626-4.024-4-8-4S4,3.374,4,6v4v4v4C4,20.626,8.024,22,12,22z M12,20 c-3.722,0-6-1.295-6-2v-1.268C7.541,17.57,9.777,18,12,18s4.459-0.43,6-1.268V18C18,18.705,15.722,20,12,20z M12,4 c3.722,0,6,1.295,6,2s-2.278,2-6,2S6,6.705,6,6S8.278,4,12,4z M6,8.732C7.541,9.57,9.777,10,12,10s4.459-0.43,6-1.268V10 c0,0.705-2.278,2-6,2s-6-1.295-6-2V8.732z M6,12.732C7.541,13.57,9.777,14,12,14s4.459-0.43,6-1.268V14c0,0.705-2.278,2-6,2 s-6-1.295-6-2V12.732z"></path></svg> Staking</a>
                </Link>
                <Link href="https://github.com/Taki21/XDC-Hackathon/blob/main/GUIDE.md">
                    <a className="flex py-2 pl-2"><svg className="mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>Get Started</a>
                </Link>
                <Link href="/">
                    <a className="flex py-2 pl-2 mt-8"><svg className="mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M8.003,15c0-1.103,0.897-2,2-2h4c1.103,0,2,0.897,2,2v5h3.001l-0.001-8.586l-7-7l-7,7V20h3V15z"></path><path fill="none" d="M10.003 15H14.003V20H10.003z"></path><path d="M5.003,22h4h6h4c1.103,0,2-0.897,2-2v-9c0-0.265-0.105-0.52-0.293-0.707l-8-8c-0.391-0.391-1.023-0.391-1.414,0l-8,8 C3.108,10.48,3.003,10.735,3.003,11v9C3.003,21.103,3.9,22,5.003,22z M10.003,20v-5h4v5H10.003z M5.003,11.414l7-7l7,7L19.004,20 h-3.001v-5c0-1.103-0.897-2-2-2h-4c-1.103,0-2,0.897-2,2v5h-3V11.414z"></path></svg>Home</a>
                </Link>
            </div>

            <div className="flex self-start p-4">
                <button onClick={disconnect} className="text-white rounded-lg w-24 py-2 bg-[#335693] hover:bg-[#1a2d56] transition-all justify-center">Logout</button>
            </div>
        </div>
    );
}

export default Sidebar