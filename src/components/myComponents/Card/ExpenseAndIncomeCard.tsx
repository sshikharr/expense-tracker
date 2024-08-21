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
import { Transactions, user } from "../../../store/store1";
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
    const request = indexedDB.open("uuDB5", 1);
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
              if (
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