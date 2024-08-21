import ExpenseAndIncomeCard from "../components/myComponents/Card/ExpenseAndIncomeCard";
import TransactionCard from "../components/myComponents/Card/TransactionsCard";
import TopbarTransaction from "../components/myComponents/Topbar/TopbarTransaction";
import { ThemeProvider } from "../components/theme-provider";
import { Transactions, User } from "../store/store1";

function ExpenseIncome(){
    const userString = localStorage.getItem("storedUser");
    let transactionArray: Transactions[] = [];
    if(userString===null){
        console.log("No user");
    }else{
        const user: User = JSON.parse(userString)
        transactionArray = user.transactions
    }
    
    return(
        <>
        <ThemeProvider>
            <TopbarTransaction/>
            <div className="w-screen flex flex-col items-center p-4 bg-gradient-to-br from-orange-200 to-purple-200 dark:from-slate-950 dark:to-slate-950 ">
                <div className="flex flex-col items-center mb-4">
                    <h1 className="font-bold text-3xl">Expense Tracker</h1>
                    <p className="text-gray-500">Manage your income and expenses with ease.</p>
                </div>
                <div className="lg:w-5/12 flex flex-col gap-8">
                    <ExpenseAndIncomeCard/>
                    {transactionArray.map((transaction)=>{
                        if (transaction.type !== "")
                                    return (
                                        <TransactionCard
                                            type={transaction.type}
                                            category={transaction.category}
                                            description={transaction.description}
                                            date={transaction.date}
                                            amount={parseInt(transaction.amount)}
                                        />
                                    );
                    })} 
                </div>
                
            </div>
        </ThemeProvider>
        </>
    )
}

export default ExpenseIncome;