import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart"
import {  Transactions, User } from "../../../store/store1";

const chartConfig = {
  amount: {
    label: "Amt.",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-3))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

function ExpenseVSIncome() {
  let allExpenseTransactions: Transactions[] = [];
let allIncomeTransactions: Transactions[] = [];
const userString = localStorage.getItem("storedUser");
if (userString === null) {
  console.log("No user yet");
} else {
  const user: User = JSON.parse(userString);
  const allTransactions: Transactions[] = user.transactions;
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

const chartData = [
  { category: "income", amount: incomeAmount, fill: "var(--color-income)" },
  { category: "expense", amount: expenseAmount, fill: "var(--color-expense)" },
] 
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Bar Chart - Income V/S Expense</CardTitle>
        <CardDescription>Overall</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey = "category"
              type = "category"
              tickLine = {false}
              tickMargin = {10}
              axisLine = {false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="amount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" layout="vertical" radius={5} barSize={50} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Showing comparision between income and expenses. <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          This will help you understand the gap between your Expenses and Income visually.
          
        </div>
      </CardFooter>
    </Card>
  )
}

export default ExpenseVSIncome;