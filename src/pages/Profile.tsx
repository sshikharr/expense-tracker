import ProfileCard from "../components/myComponents/Card/ProfileCard";
import TopbarProfile from "../components/myComponents/Topbar/TopbarProfile";
import { ThemeProvider } from "../components/theme-provider";

function Profile(){
    return(
        <>
        <ThemeProvider>
        <TopbarProfile/>
            <div className="w- screen h-screen flex flex-col justify-center bg-gradient-to-br from-orange-200 to-purple-200 min-h-screen dark:from-slate-950 dark:to-slate-950">
                <div className="flex flex-row justify-center">
                    <div className="w-screen flex flex-row justify-center">
                    <ProfileCard/>
                    </div>   
                </div>
            </div>
        </ThemeProvider>
        </>
    )
}

export default Profile;