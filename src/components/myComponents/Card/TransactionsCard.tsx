import { useEffect, useRef } from "react";
import { Card } from "../../ui/card";
interface HistoryCardProps {
  type: string;
  category: string;
  amount: number;
  description: string;
  date: Date | string | null;
}

function formatDate(date: Date | string | null): string {
  if (!date) return "Invalid date";
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
}

function TransactionCard({ type, category, amount, description, date }: HistoryCardProps) {
  const elementRef1 = useRef<HTMLDivElement>(null);
  const elementRef2 = useRef<HTMLDivElement>(null);
  const elementRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === "income") {
      elementRef1.current?.classList.remove('hidden');
      elementRef1.current?.classList.add('block');
      elementRef3.current?.classList.add('text-green-700');
    } else if (type === "expense") {
      elementRef2.current?.classList.remove('hidden');
      elementRef2.current?.classList.add('block');
      elementRef3.current?.classList.add('text-red-500');
    }
  }, [type]);

  return (
    <>
      <div>
        <Card className="p-4">
          <div className="flex flex-row justify-between py-3">
            <div className="flex flex-row">
              <div ref={elementRef1} className="hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" color="green">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                </svg>
              </div>
              <div ref={elementRef2} className="hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" color="red">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                </svg>
              </div>
              <h1 className="text-lg font-semibold capitalize">{type}</h1>
            </div>
            <p className="text-sm text-gray-500 capitalize">{formatDate(date)}</p>
          </div>
          <div className="flex flex-row justify-between py-1 capitalize">
            <p className="text-gray-500">Category</p>
            <p>{category}</p>
          </div>
          <div className="flex flex-row justify-between py-1 capitalize">
            <p className="text-gray-500">Amount</p>
            <p className="font-semibold" ref={elementRef3}>₹{amount}</p>
          </div>
          <div className="flex flex-row justify-between py-3 capitalize">
            <p className="text-gray-500 text-lg">{description}</p>
          </div>
        </Card>
      </div>
    </>
  );
}

export default TransactionCard;