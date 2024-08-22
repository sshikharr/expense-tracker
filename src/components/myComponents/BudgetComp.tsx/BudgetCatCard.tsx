interface BudgetCatCardProps {
  category: string;
  amount?: number;
}

function BudgetCatCard({ category, amount = 0 }: BudgetCatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-6 bg-white dark:bg-slate-950 shadow-lg rounded-lg transform transition duration-500 hover:scale-105 dark:border-2 border-gray-600">
      <div className="text-4xl font-bold text-gray-800 dark:text-white">
        {category}
      </div>
      <div className="text-2xl font-semibold text-green-600 mt-2">
        ₹ {amount.toLocaleString()}
      </div>
    </div>
  );
}

export default BudgetCatCard;