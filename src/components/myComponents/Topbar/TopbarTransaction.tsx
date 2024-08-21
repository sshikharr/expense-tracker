import { Wallet } from "lucide-react"
import { ModeToggle } from "../../mode-toggle"
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"


function TopbarTransaction(){
    const navigate = useNavigate();
    return(
        <>
            <div className=" flex flex-row justify-between w-full p-3 bg-gradient-to-br from-orange-100 to-purple-100 dark:from-slate-950 dark:to-slate-950">
            <div className=" flex items-center ml-2 hover:cursor-pointer gap-x-6" onClick={()=>{
                navigate('/dashboard')
            }}>
                <Wallet size={30}/>
                <div className="text-xl font-semibold ">
                    <h1>Expense Tracker</h1>
                </div>
            </div>
            <div className="flex flex-row focus:bg-white">
                <div className="flex flex-row px-2 py-1 font-semibold text-base leading-tight gap-x-6">
                    
                    <div className="mx-4 hover:cursor-pointer hover:underline"><ModeToggle/></div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={()=>{
                                navigate('/dashboard')
                            }}>Dashboard</DropdownMenuItem>
                            <DropdownMenuItem onClick={()=>{
                                navigate('/profile')
                            }}>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={()=>{
                                localStorage.clear();
                                navigate('/landingPage')            
                            }}>Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    
                </div>
            </div>
    </div>
        </>
    )
}

export default TopbarTransaction;