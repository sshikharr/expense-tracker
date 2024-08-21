import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Transactions, User } from "../../../store/store1";

function ProfileCard() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [allTransactions, setAllTransactions] = useState<Transactions[]>([]);
  const [renderTrigger, setRenderTrigger] = useState(0);

  useEffect(() => {
    const request = indexedDB.open("uuDB5", 1);

    request.onsuccess = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(["users"], "readonly");
      const objectStore = transaction.objectStore("users");
      const userString = localStorage.getItem("storedUser");
      if (userString) {
        const storedUser = JSON.parse(userString);
        const getRequest = objectStore.get(storedUser.username);

        getRequest.onsuccess = function (event) {
          const user = (event.target as IDBRequest).result;
          if (user) {
            setUser(user);
            setName(user.name);
            setPassword(user.password);
            setAllTransactions(user.transactions || []);
          }
        };

        getRequest.onerror = function (event) {
          console.error("Error getting user:", (event.target as IDBRequest).error);
        };
      }
    };

    request.onerror = function (event) {
      console.error("Database error:", (event.target as IDBRequest).error);
    };
  }, [renderTrigger]);

  const updateUserInDB = (newUser: User) => {
    const request = indexedDB.open("uuDB5", 1);

    request.onsuccess = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(["users"], "readwrite");
      const objectStore = transaction.objectStore("users");
      const updateRequest = objectStore.put(newUser);

      updateRequest.onsuccess = function () {
        setRenderTrigger(renderTrigger + 1);
      };

      updateRequest.onerror = function (event) {
        console.error("Error updating user:", (event.target as IDBRequest).error);
      };
    };

    request.onerror = function (event) {
      console.error("Database error:", (event.target as IDBRequest).error);
    };
  };

  let allExpenseTransactions: Transactions[] = [];
  let allIncomeTransactions: Transactions[] = [];

  if (user) {
    allExpenseTransactions = allTransactions.filter(transaction => transaction.type === "expense");
    allIncomeTransactions = allTransactions.filter(transaction => transaction.type === "income");
  }

  let incomeAmount = 0;
  let expenseAmount = 0;

  for (let i = 0; i < allIncomeTransactions.length; i++) {
    const transaction = allIncomeTransactions[i];
    incomeAmount += parseInt(transaction.amount);
  }

  for (let i = 0; i < allExpenseTransactions.length; i++) {
    const transaction = allExpenseTransactions[i];
    expenseAmount += parseInt(transaction.amount);
  }

  return (
    <>
      <Card className="w-full p-8 lg:w-2/3">
        <div className="w-full">
          <div className="flex flex-row justify-center text-center">
            <div className="flex flex-col gap-2">
              <div className="flex justify-center">
                <img src="https://github.com/shadcn.png" className="h-16 rounded-full"></img>
              </div>
              <h1 className="text-xl font-semibold">{user?.name}</h1>
              <h3>{user?.username}</h3>
            </div>
          </div>

          <div className="lg:flex lg:flex-row justify-center text-center gap-4 mt-4 w-full">
            <div className="border-2 p-2">
              <h1 className="md:text-4xl font-bold">{expenseAmount}</h1>
              <p className="text-gray-500">Total Expenses</p>
            </div>
            <div className="border-2 p-2">
              <h1 className="md:text-4xl font-bold">{incomeAmount}</h1>
              <p className="text-gray-500">Total Income</p>
            </div>
            <div className="border-2 p-2">
              <h1 className="md:text-4xl font-bold">{allTransactions.length}</h1>
              <p className="text-gray-500">Total Transactions</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-5 w-full">
            <h1 className="text-xl font-bold flex justify-center">Settings</h1>
            <div className="flex justify-center w-full">
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-lg font-medium">Name</h2>
                <input
                  value={name}
                  className="border-2 p-1 text-black"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white w-full mt-5">
          <Button
            className="w-full"
            onClick={() => {
              if (user) {
                const newUser: User = {
                  username: user.username,
                  name: name || "",
                  password: password || "",
                  transactions: user.transactions || [],
                };
                updateUserInDB(newUser);
              }
            }}
          >
            Save Changes
          </Button>
        </div>
      </Card>
    </>
  );
}

export default ProfileCard;