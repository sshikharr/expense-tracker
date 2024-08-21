import {  LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import { Transactions, User } from "../../../store/store1";
import React from "react";
import { TrendingUp } from "lucide-react";

interface ChartData {
  category: string;
  amount: number;
  fill: string;
}

const chartConfig = {
  amount: {
    label: "Amount",
  },
  salary: {
    label: "Salary",
    color: "hsl(var(--chart-1))",
  },
  business: {
    label: "Business",
    color: "hsl(var(--chart-2))",
  },
  freelancing: {
    label: "Freelancing",
    color: "hsl(var(--chart-3))",
  },
  bonus: {
    label: "Bonus",
    color: "hsl(var(--chart-4))",
  },
  internships: {
    label: "Internships",
    color: "hsl(var(--chart-5))",
  },
  others: {
    label: "Others",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

function IncomeGraphCard() {
  let allIncomeTransactions: Transactions[] = [];
  const userString = localStorage.getItem("storedUser");
  if (userString === null) {
    console.log("No user yet");
  } else {
    const user: User = JSON.parse(userString);
    const allTransactions: Transactions[] = user.transactions
    allIncomeTransactions = allTransactions.filter(
      (transaction) => transaction.type === "income"
    );
  }

  let salaryAmount = 0;
  let businessAmount = 0;
  let freelancingAmount = 0;
  let bonusAmount = 0;
  let internshipsAmount = 0;
  let otherAmount = 0;

  for (let i = 0; i < allIncomeTransactions.length; i++) {
    const transaction = allIncomeTransactions[i];
    if (transaction.category === "salary") {
      salaryAmount += parseInt(transaction.amount);
    } else if (transaction.category === "business") {
      businessAmount += parseInt(transaction.amount);
    } else if (transaction.category === "freelancing") {
      freelancingAmount += parseInt(transaction.amount);
    } else if (transaction.category === "bonus") {
      bonusAmount += parseInt(transaction.amount);
    } else if (transaction.category === "internships") {
      internshipsAmount += parseInt(transaction.amount);
    } else {
      otherAmount += parseInt(transaction.amount);
    }
  }

  let chartData: ChartData[];
  if (allIncomeTransactions.length === 0) {
    chartData = [
      { category: "No Income Yet", amount: 0, fill: "var(--color-chrome)" },
    ];
  } else {
    chartData = [
      { category: "Salary", amount: salaryAmount, fill: chartConfig.salary.color },
      { category: "Business", amount: businessAmount, fill: chartConfig.business.color },
      { category: "Freelancing", amount: freelancingAmount, fill: chartConfig.freelancing.color },
      { category: "Bonus", amount: bonusAmount, fill: chartConfig.bonus.color },
      { category: "Intern.", amount: internshipsAmount, fill: chartConfig.internships.color },
      { category: "Others", amount: otherAmount, fill: chartConfig.others.color },
    ];
  }

  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, [chartData]);
   return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Income</CardTitle>
        <CardDescription>Overall</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {totalAmount ? (
            <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" hideLabel />}
            />
            <Pie data={chartData} dataKey="amount" nameKey="category">
              <LabelList
                dataKey="category"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        ): (
            <div className="flex justify-center items-center h-full text-3xl font-semibold">
                <p>No data available</p>
            </div>
        )}
        
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          This graph represents your income shares <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          The shares are divided category-wise.
        </div>
      </CardFooter>
    </Card>
  )
}

export default IncomeGraphCard;
