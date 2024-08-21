import { Wallet } from "lucide-react"
import { ModeToggle } from "../../mode-toggle"
import { useNavigate } from "react-router-dom";
function Topbar(){
    const navigate = useNavigate();
    return(<>
        <div className=" flex flex-row justify-between w-full p-3">
                <div className=" flex items-center ml-2 hover:cursor-pointer" onClick={()=>{
                    navigate('/landingPage')
                }}>
                 <Wallet size={30}/>
                </div>
                <div className="flex flex-row focus:bg-white">
                <div className="flex flex-row px-2 py-1 font-semibold text-base leading-tight">
                    <div className="mx-4 hover:cursor-pointer hover:underline"><ModeToggle/></div>
                </div>
                </div>
            </div>
    </>)
}

export default Topbar;
