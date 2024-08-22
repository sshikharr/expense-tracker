import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import ExpenseCategory from "../ExpenseAndIncomeComp/ExpenseCategory";
import MyCalendar from "../ExpenseAndIncomeComp/MyCalendar";
import AmountSelector from "../ExpenseAndIncomeComp/AmountSelector";
import Description from "../ExpenseAndIncomeComp/Description";

import IncomeCategory from "../ExpenseAndIncomeComp/IncomeCategory";
import { useRecoilState } from "recoil";
import { Budget, Transactions, User, user } from "../../../store/store1";
import TransactionRadio from "../ExpenseAndIncomeComp/TransactionRadio";
import { useRef, useState, useEffect } from "react";

function ExpenseAndIncomeCard() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [currUser, setCurrUser] = useRecoilState(user);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [description, setDescription] = useState("");

  let allExpenseTransactions: Transactions[] = [];
  let allEntBudget: Budget[] = [];
  let allEduBudget: Budget[] = [];
  let allTranspBudget: Budget[] = [];
  let allMedicalBudget: Budget[] = [];
  let allMiscBudget: Budget[] = [];
  let allBillsBudget: Budget[] = [];

  const userString = localStorage.getItem("storedUser");
  if (userString === null) {
    console.log("No user yet");
  } else {
    const user: User = JSON.parse(userString)
    const allTransactions: Transactions[] = user.transactions;
    const allBudget: Budget[] = user.budget;
    allExpenseTransactions = allTransactions.filter(transaction => transaction.type === "expense");
    allEntBudget = allBudget.filter(budget=> budget.category === "entertainment");
    allEduBudget = allBudget.filter(budget=> budget.category === "education");
    allTranspBudget = allBudget.filter(budget=> budget.category === "transportation");
    allMedicalBudget = allBudget.filter(budget=> budget.category === "medical");
    allMiscBudget = allBudget.filter(budget=> budget.category === "miscellaneous");
    allBillsBudget = allBudget.filter(budget=> budget.category === "bills")
  }

  let entAmount = 0;
  let eduAmount = 0;
  let transpAmount = 0;
  let billsAmount = 0;
  let medicalAmount = 0;
  let miscAmount = 0;

  let entBudget=0;
  let eduBudget=0;
  let transpBudget=0;
  let billsBudget=0;
  let medicalBudget=0;
  let miscBudget=0;

  for (let i = 0; i < allExpenseTransactions.length; i++) {
    const transaction = allExpenseTransactions[i];
    if(transaction.category==="entertainment"){
      entAmount += parseInt(transaction.amount)
    }else if(transaction.category==="education"){
      eduAmount += parseInt(transaction.amount)
    }else if(transaction.category==="transportation"){
      transpAmount += parseInt(transaction.amount)
    }else if(transaction.category==="bills"){
      billsAmount += parseInt(transaction.amount)
    }else if(transaction.category==="medical"){
      medicalAmount += parseInt(transaction.amount)
    }else{
      miscAmount += parseInt(transaction.amount)
    }
    
}

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


  useEffect(() => {
    const storedUser = localStorage.getItem("storedUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrUser(parsedUser);
    }
  }, []);

  const resetForm = () => {
    setCategory("");
    setAmount("");
    setType("");
    setDate(null);
    setDescription("");
  };

  const saveStateToLocalStorage = <T,>(key: string, state: T): void => {
    localStorage.setItem(key, JSON.stringify(state));
  };

  const updateUserTransactionsInDB = (newTransaction: Transactions, callback: () => void) => {
    const request = indexedDB.open("uuDB11", 1);
    request.onupgradeneeded = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("users")) {
        const objectStore = db.createObjectStore("users", { keyPath: "username" });
        objectStore.createIndex("username", "username", { unique: true });
      }
    };

    request.onsuccess = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(["users"], "readwrite");
      const objectStore = transaction.objectStore("users");
      const getRequest = objectStore.get(currUser.username);
      getRequest.onsuccess = function (event) {
        const user = (event.target as IDBRequest).result;
        if (user) {
          user.transactions = [...(user.transactions || []), newTransaction];
          const updateRequest = objectStore.put(user);

          updateRequest.onsuccess = function () {
            callback();
          };

          updateRequest.onerror = function (event) {
            console.error("Error updating user transactions:", (event.target as IDBRequest).error);
          };
        } else {
          console.error("User not found in IndexedDB");
        }
      };

      getRequest.onerror = function (event) {
        console.error("Error getting user:", (event.target as IDBRequest).error);
      };
    };

    request.onerror = function (event) {
      console.error("Database error:", (event.target as IDBRequest).error);
    };
  };

  return (
    <>
      <Card className="lg:w-full flex flex-col ">
        <CardHeader className="mb-4">
          <CardTitle>Add Transactions</CardTitle>
          <CardDescription>Fill out the form to add a new income or expense.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center">
              <div className="lg:flex lg:flex-row lg:justify-start justify-center flex flex-col gap-4">
                <div className="lg:w-1/2 flex flex-col gap-4">
                  <TransactionRadio setType={setType} />
                  <div className="flex flex-col gap-3">
                    {type === "income" ? (
                      <IncomeCategory category={category} setCategory={setCategory} />
                    ) : (
                      <ExpenseCategory category={category} setCategory={setCategory} />
                    )}
                  </div>
                </div>

                <div className="lg:w-1/2 flex flex-col gap-4">
                  <MyCalendar date={date} setDate={setDate} />
                  <AmountSelector amount={amount} setAmount={setAmount} />
                </div>
              </div>
            </div>
            <div className="flex flex-col py-3">
              <Description setDescription={setDescription} />
            </div>
          </form>
        </CardContent>
        <div className="flex justify-center text-red-600 mb-6">
          <p className="hidden" ref={elementRef}>All the details not filled</p>
        </div>
        <CardFooter className="flex justify-center">
          <Button
            className="w-full"
            onClick={() => {
              const newTransaction = {
                type: type,
                category: category,
                date: date,
                amount: amount,
                description: description,
              };
              const isOvershootingBudget = (category: string, amount: number, budget: number) => {
      return amount > budget;
    };

    if (newTransaction.type === "expense") {
      switch (newTransaction.category) {
        case "entertainment":
          if (isOvershootingBudget("entertainment", entAmount + parseInt(newTransaction.amount), entBudget) && entBudget>0) {
            console.log(entBudget)
            alert("Overshooting Entertainment Budget");
            return;
          }
          break;
        case "education":
          if (isOvershootingBudget("education", eduAmount + parseInt(newTransaction.amount), eduBudget) && eduBudget>0) {
            alert("Overshooting Education Budget");
            return;
          }
          break;
        case "transportation":
          if (isOvershootingBudget("transportation", transpAmount + parseInt(newTransaction.amount), transpBudget) && transpBudget>0) {
            alert("Overshooting Transportation Budget");
            return;
          }
          break;
        case "bills":
          if (isOvershootingBudget("bills", billsAmount + parseInt(newTransaction.amount), billsBudget) && billsBudget>0) {
            alert("Overshooting Bills Budget");
            return;
          }
          break;
        case "miscellaneous":
          if (isOvershootingBudget("miscellaneous", miscAmount + parseInt(newTransaction.amount), miscBudget) && miscBudget>0) {
            alert("Overshooting Miscellaneous Budget");
            return;
          }
          break;
        case "medical":
          if (isOvershootingBudget("medical", medicalAmount + parseInt(newTransaction.amount), medicalBudget) && medicalBudget>0) {
            alert("Overshooting Medical Budget");
            return;
          }
          break;
        default:
          break;
      }
    }
              if(
                newTransaction.type === "" ||
                newTransaction.date === null ||
                newTransaction.category === "" ||
                newTransaction.description === "" ||
                newTransaction.amount === ""
              ) {
                elementRef.current?.classList.remove("hidden");
                elementRef.current?.classList.add("block");
              } else {
                elementRef.current?.classList.remove("block");
                elementRef.current?.classList.add("hidden");

                const updatedUser = {
                  ...currUser,
                  transactions: [...currUser.transactions, newTransaction],
                };
                setCurrUser(updatedUser);
                saveStateToLocalStorage("storedUser", updatedUser);

                updateUserTransactionsInDB(newTransaction, () => {
                  window.location.reload();
                  resetForm();
                });
              }
            }}
          >
            Add Transaction
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default ExpenseAndIncomeCard;