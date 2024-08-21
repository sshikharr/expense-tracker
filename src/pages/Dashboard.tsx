import { useEffect } from "react";
import DashboardCard1 from "../components/myComponents/Card/DashboardCard1";
import ExpensePieCard from "../components/myComponents/Card/ExpensePieCard";
import ExpenseVSIncome from "../components/myComponents/Card/ExpenseVSIncomeCard";
import IncomeGraphCard from "../components/myComponents/Card/IncomeGraphCard";
import TopbarDashboard from "../components/myComponents/Topbar/TopbarDashboard";
import { ThemeProvider } from "../components/theme-provider";
import { Transactions, User } from "../store/store1";

function Dashboard(){
useEffect(() => {
        window.scrollTo(0, 0);
}, []);
let allExpenseTransactions: Transactions[] = [];
let allIncomeTransactions: Transactions[] = [];

const userString = localStorage.getItem("storedUser");
if (userString === null) {
  console.log("No user yet");
} else {
  const user: User = JSON.parse(userString)
  const allTransactions: Transactions[] = user.transactions
  allExpenseTransactions = allTransactions.filter(transaction => transaction.type === "expense");
  allIncomeTransactions = allTransactions.filter(transaction=>transaction.type === "income")
}
let incomeAmount = 0;
let expenseAmount = 0;

for (let i = 0; i < allIncomeTransactions.length; i++) {
  const transaction = allIncomeTransactions[i];
    incomeAmount += parseInt(transaction.amount)
}

for (let i = 0; i < allExpenseTransactions.length; i++) {
  const transaction = allExpenseTransactions[i];
    expenseAmount += parseInt(transaction.amount)
}
console.log(expenseAmount)
    return(<>
    <ThemeProvider>
        <div className="w-screen ">
            <div className="w-full">
                <TopbarDashboard/>
            </div>
            
    
    <div className="w-screen flex flex-col gap-4 sm:pl-0 bg-gradient-to-br from-orange-200 to-purple-200 min-h-screen dark:from-slate-950 dark:to-slate-950">
        <div className="md:grid md:grid-cols-3 md:justify-around gap-x-3 px-4 h-1/4 flex flex-col md:gap-2 gap-8 mt-10">
            <div><DashboardCard1 heading="Total Income" subheading="Overall" amount={incomeAmount}/></div>
            <div><DashboardCard1 heading="Total Expense" subheading="Overall" amount={expenseAmount}/></div>
            <div><DashboardCard1 heading="Net Flow" subheading="Overall" amount={incomeAmount-expenseAmount}/></div>
        </div>

        <div className="md:grid md:grid-cols-2 px-4 mt-2 flex flex-col gap-8">
            <div className="h-96 "><ExpensePieCard/></div>
            <div className="h-96"><IncomeGraphCard/></div>
        </div>
        <div className="flex flex-row justify-center">
            <div className="px-4 lg:w-8/12"><ExpenseVSIncome/></div>
        </div>
    </div>
    <div>
    </div>
        </div>
        
    </ThemeProvider>
    </>
    )
}

export default Dashboard;