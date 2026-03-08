import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/prepareIncomeLineChartData";
import CustomLineChart from "./CustomeLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions , onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    console.log("Result: ", result);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChartData(result);

    return () => {};
  }, [transactions]);
  return (
    <div className="bg-white shadow-md rounded-lg p-5 mt-3">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p className="text-sm text-gray-400 mt-0">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button onClick={onAddIncome} className="bg-linear-to-r from-purple-100 to-blue-100 py-2 px-3 rounded-lg active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1">
            <Plus size={15} className='text-lg' /> Add income
        </button>
      </div>

      <div className="mt-10">
        {/* create line chart  */}
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
