interface DashboardProps{
    heading: string,
    subheading: string,
    amount: number
}

function DashboardCard1({heading, subheading, amount}: DashboardProps){
    return(
        
            <div className="flex flex-col border-2 rounded-md justify-between p-4 pb-6 border-gray-700 dark:border-white">
                <div className="flex flex-col h-full gap-1">
                    <p className="text-2xl font-semibold">{heading}</p>
                    <p className="text-gray-500 font-light text-sm">{subheading}</p>
                </div>

                <div>
                    <p className="text-4xl font-bold">₹{amount}</p>
                </div>
            </div>
        
    )
}

export default DashboardCard1;