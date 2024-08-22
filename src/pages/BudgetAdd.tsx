import BudgetCatCard from "../components/myComponents/BudgetComp.tsx/BudgetCatCard";
import BudgetAddCard from "../components/myComponents/Card/BudgetAddCard";
import TopbarBudget from "../components/myComponents/Topbar/TopbarBudget";
import { ThemeProvider } from "../components/theme-provider";
import { Budget } from "../store/store1";

function BudgetAdd() {
  const userString = localStorage.getItem("storedUser");
  let user;
  if (userString === null) {
    console.log("No user yet");
  } else {
    user = JSON.parse(userString);
  }
  const allBudget: Budget[] = user.budget;

  const allEntBudget = allBudget.filter(budget => budget.category === "entertainment");
  const allEduBudget = allBudget.filter(budget => budget.category === "education");
  const allTranspBudget = allBudget.filter(budget => budget.category === "transportation");
  const allMedicalBudget = allBudget.filter(budget => budget.category === "medical");
  const allMiscBudget = allBudget.filter(budget => budget.category === "miscellaneous");
  const allBillsBudget = allBudget.filter(budget => budget.category === "bills");

  let entBudget = 0;
  let eduBudget = 0;
  let transpBudget = 0;
  let billsBudget = 0;
  let medicalBudget = 0;
  let miscBudget = 0;

  if (allEntBudget.length > 0) {
    for (const budget of allEntBudget) {
      entBudget += parseInt(budget.amount);
    }
  }

  if (allEduBudget.length > 0) {
    for (const budget of allEduBudget) {
      eduBudget += parseInt(budget.amount);
    }
  }

  if (allTranspBudget.length > 0) {
    for (const budget of allTranspBudget) {
      transpBudget += parseInt(budget.amount);
    }
  }

  if (allMedicalBudget.length > 0) {
    for (const budget of allMedicalBudget) {
      medicalBudget += parseInt(budget.amount);
    }
  }

  if (allBillsBudget.length > 0) {
    for (const budget of allBillsBudget) {
      billsBudget += parseInt(budget.amount);
    }
  }

  if (allMiscBudget.length > 0) {
    for (const budget of allMiscBudget) {
      miscBudget += parseInt(budget.amount);
    }
  }

  return (
    <>
      <ThemeProvider>
        <TopbarBudget />
        <div className="w-screen h-max bg-gradient-to-br from-orange-200 to-purple-200 dark:from-slate-950 dark:to-slate-950 p-4">
          <BudgetAddCard />
          <div className="flex flex-row justify-center mt-8">
            <div className="w-full max-w-4xl flex flex-col gap-6">
              <BudgetCatCard category="Entertainment" amount={entBudget} />
              <BudgetCatCard category="Education" amount={eduBudget} />
              <BudgetCatCard category="Transportation" amount={transpBudget} />
              <BudgetCatCard category="Medical" amount={medicalBudget} />
              <BudgetCatCard category="Bills" amount={billsBudget} />
              <BudgetCatCard category="Miscellaneous" amount={miscBudget} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default BudgetAdd;