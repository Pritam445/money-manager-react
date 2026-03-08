import { ArrowRight } from "lucide-react";
import React from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button onClick={onMore} className="bg-purple-800 flex items-center gap-2 justify-center px-3 py-2 text-white rounded-lg hover:bg-purple-700 active:scale-95">
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>
      <div>
        {transactions?.slice(0, 5)?.map((item) => (
            <TransactionInfoCard
              key={item.id}
              title={item.name}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={type}
            />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
