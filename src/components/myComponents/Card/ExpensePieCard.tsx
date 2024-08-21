import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart"
import { Transactions, User } from "../../../store/store1"

interface ChartData {
  category: string;
  amount: number;
  fill: string;
}

const chartConfig = {
  amount: {
    label: "Amount",
  },
  bills: {
    label: "Bills",
    color: "hsl(var(--chart-1))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-2))",
  },
  education: {
    label: "Education",
    color: "hsl(var(--chart-3))",
  },
  transportation: {
    label: "Transportation",
    color: "hsl(var(--chart-4))",
  },
  medical: {
    label: "Medical",
    color: "hsl(var(--chart-5))",
  },
  miscellaneous:{
    label: "Miscellaneous",
    color: "hsl(var(--chart-6))"
  }
} satisfies ChartConfig

function ExpensePieCard() {
  let allExpenseTransactions: Transactions[] = [];
  const userString = localStorage.getItem("storedUser");
if (userString === null) {
  console.log("No user yet");
} else {
  const user: User = JSON.parse(userString)
  const allTransactions: Transactions[] = user.transactions;
  allExpenseTransactions = allTransactions.filter(transaction => transaction.type === "expense");
}

let billsAmount = 0;
let entertainmentAmount = 0;
let educationAmount = 0;
let medicalAmount = 0;
let transportationAmount = 0;
let miscellaneousAmount = 0;


for (let i = 0; i < allExpenseTransactions.length; i++) {
  const transaction = allExpenseTransactions[i];
  if (transaction.category === "bills") {
    billsAmount += parseInt(transaction.amount);
  } else if (transaction.category === "entertainment") {
    entertainmentAmount += parseInt(transaction.amount);
  } else if (transaction.category === "education") {
    educationAmount += parseInt(transaction.amount);
  } else if (transaction.category === "transportation") {
    transportationAmount += parseInt(transaction.amount);
  } else if (transaction.category === "medical") {
    medicalAmount += parseInt(transaction.amount);
  } else {
    miscellaneousAmount += parseInt(transaction.amount);
  }
}

let chartData: ChartData[];
if (allExpenseTransactions.length === 0) {
  chartData = [
    { category: "No Expense Yet", amount: 0, fill: "var(--color-bills)" }
  ];
} else {
  chartData = [
    { category: "Bills", amount: billsAmount, fill: "var(--color-bills)" },
    { category: "Ent.", amount: entertainmentAmount, fill: "var(--color-entertainment)" },
    { category: "Edu.", amount: educationAmount, fill: "var(--color-education)" },
    { category: "Transp.", amount: transportationAmount, fill: "var(--color-transportation)" },
    { category: "Medical", amount: medicalAmount, fill: "var(--color-medical)" },
    { category: "Misc.", amount: miscellaneousAmount, fill: "var(--color-miscellaneous)" },
  ];
}
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [chartData])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="items-center pb-0 ">
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Overall</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {totalVisitors > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={80}
                outerRadius={100}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Rupees
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex justify-center items-center h-full text-3xl font-semibold">
            <p>No data available</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          This graph represents your expense shares <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          The shares are divided category-wise.
        </div>
      </CardFooter>
    </Card>
  )
}

export default ExpensePieCard;