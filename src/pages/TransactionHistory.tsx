import { useState } from "react";
import TransactionHistoryCard from "../components/myComponents/Card/TransactionHistoryCard";
import TopbarTransaction from "../components/myComponents/Topbar/TopbarTransaction";
import { ThemeProvider } from "../components/theme-provider";
import { Transactions, User } from "../store/store1";

function TransactionHistory() {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState<Transactions[]>(() => {
    const userString = localStorage.getItem("storedUser");
    if (userString) {
      const user: User = JSON.parse(userString);
      return user.transactions;
    }
    return [];
  });

  const deleteTransaction = (index: number) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);

    const userString = localStorage.getItem("storedUser");
    if (userString) {
      const user: User = JSON.parse(userString);
      user.transactions = updatedTransactions;
      localStorage.setItem("storedUser", JSON.stringify(user));

      const request = indexedDB.open("uuDB5", 1);

      request.onsuccess = function (event) {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(["users"], "readwrite");
        const objectStore = transaction.objectStore("users");
        const updateRequest = objectStore.put(user);

        updateRequest.onsuccess = function () {
          console.log("Transaction deleted from IndexedDB");
        };

        updateRequest.onerror = function (event) {
          console.error("Error updating user:", (event.target as IDBRequest).error);
        };
      };

      request.onerror = function (event) {
        console.error("Database error:", (event.target as IDBRequest).error);
      };
    }
  };

  const filteredArray = transactions.filter((transaction) => {
    return transaction.description.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <ThemeProvider>
        <TopbarTransaction />
        <div className="w-screen h-auto bg-gradient-to-br from-orange-200 to-purple-200 min-h-screen dark:from-slate-950 dark:to-slate-950">
          <div className="px-4 pt-8 flex flex-col gap-4 ">
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl font-bold">Transaction History</h1>
              <p className="text-lg text-gray-500">View your recent transactions and account activity.</p>
              <input
                type="text"
                placeholder="Search by description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mt-4 p-2 border border-gray-300 rounded text-black"
              />
            </div>

            <div className="md:grid md:grid-cols-3 flex flex-col gap-y-6 gap-x-3">
              {filteredArray.map((transaction, index) => {
                if (transaction.type !== "")
                  return (
                    <TransactionHistoryCard
                      key={index}
                      type={transaction.type}
                      category={transaction.category}
                      description={transaction.description}
                      date={transaction.date}
                      amount={parseInt(transaction.amount)}
                      index={index}
                      onDelete={deleteTransaction}
                    />
                  );
              })}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default TransactionHistory;