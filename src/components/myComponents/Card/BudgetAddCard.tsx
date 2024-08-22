import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import AmountSelector from "../ExpenseAndIncomeComp/AmountSelector";
import { Budget, user } from "../../../store/store1";
import { useRecoilState } from "recoil";
import BudgetCategory from "../BudgetComp.tsx/BudgetCategory";

function BudgetAddCard(){
    const elementRef = useRef<HTMLDivElement>(null)
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [currUser, setCurrUser] = useRecoilState(user)

    const saveStateToLocalStorage = <T,>(key: string, state: T): void => {
    localStorage.setItem(key, JSON.stringify(state));
  };

  const resetForm = () => {
    setCategory("");
    setAmount("");
  };

  const updateUserBudgetInDB = (newBudget: Budget, callback: () => void) => {
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
          user.budget = [...(user.budget || []), newBudget];
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

    useEffect(() => {
    const storedUser = localStorage.getItem("storedUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrUser(parsedUser);
    }
  }, []);
    return(
        <>
            <Card className="lg:w-full flex flex-col ">
        <CardHeader className="mb-4  flex flex-row md:justify-center">
            <div className="flex flex-col md:text-center gap-2">
                <CardTitle>Add Category-wise budgets</CardTitle>
                <CardDescription>Put budget limits on your expense.</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center">
              <div className="lg:flex lg:flex-row lg:justify-start justify-center flex flex-col gap-4">
                <div className="w-full flex flex-col gap-4">
                  
                  <div className="flex flex-col gap-3">

                      <BudgetCategory category={category} setCategory={setCategory} />

                  </div>
                  <div className="w-full flex flex-col gap-4">
                  <AmountSelector amount={amount} setAmount={setAmount} />
                </div>
                </div>
              </div>
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
              const newBudget = {
                category: category,
                amount: amount,
              };
              if (
                newBudget.category === "" ||
                newBudget.amount === ""
              ) {
                elementRef.current?.classList.remove("hidden");
                elementRef.current?.classList.add("block");
              } else {
                elementRef.current?.classList.remove("block");
                elementRef.current?.classList.add("hidden");

                const updatedUser = {
                  ...currUser,
                  budget: [...currUser.budget, newBudget],
                };
                setCurrUser(updatedUser);
                saveStateToLocalStorage("storedUser", updatedUser);

                updateUserBudgetInDB(newBudget, () => {
                  window.location.reload();
                  resetForm();
                });
              }
            }}
          >
            Add Budget
          </Button>
        </CardFooter>
      </Card>
        </>
    )
}

export default BudgetAddCard;