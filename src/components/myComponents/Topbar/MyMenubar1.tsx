import { Wallet } from "lucide-react"
import { ModeToggle } from "../../mode-toggle"
import React from "react"
import { useNavigate } from "react-router-dom"

interface MyMenubarProps{
    onClick: ()=> void
}
const MyMenubar1: React.FC<MyMenubarProps> = ({onClick})=>{
    const navigate = useNavigate();
    return(
        <>

            <div className=" flex flex-row justify-between w-full p-3 ">
                <div className=" flex items-center ml-2 hover:cursor-pointer" onClick={()=>{
                    navigate('/landingPage')}}>
                 <Wallet size={30}/>
                </div>
                <div className="flex flex-row focus:bg-white">
                <div className="flex flex-row px-2 py-1 font-semibold text-base leading-tight">
                    <div className="flex flex-row items-center sm:text-xl text-xs">
                        <div className="sm:mx-4 hover:cursor-pointer hover:underline " onClick={onClick}>Features</div>
                        <div className="mx-4 hover:cursor-pointer hover:underline" onClick={()=>{
                            navigate('/signup')
                        }}>Register</div>
                        <div className="mx-4 hover:cursor-pointer hover:underline" onClick={()=>{
                            navigate('/signin')
                        }}>Sign In</div>
                    </div>
                    <div className="mx-4 hover:cursor-pointer hover:underline"><ModeToggle/></div>
                </div>
                </div>
            </div>

        </>
    )
}

export default MyMenubar1