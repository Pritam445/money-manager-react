import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard";
import { Loader2, WalletCards } from "lucide-react";
import { addThousandsSeparator } from "../util/addThousandsSeparator";
import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../util/config";
import { API_ENPOINTS } from "../util/apiEndpoints";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";


const Home = () => {

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading,setLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.get(API_ENPOINTS.DASHBOARD_DATA);
      console.log("Dashboard Data: ", response.data);
      if(response.status === 200) {
        setDashboardData(response.data);
      }
      
    } catch (error) {
      console.error(error);
      
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {}
  }, []);

  
  return(
  <Dashboard activeMenu="Dashboard">
    {loading ? (
      <div className="max-h-screen w-full flex items-center justify-center">
        <Loader2 size={25} className="animate-spin text-purple-800" />
      </div>
    ) : (
      <div className="my-5 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard 
        icon={<WalletCards />}
        label={"Total Balance"}
        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
        color={"bg-purple-800"}
         />

           <InfoCard 
        icon={<WalletCards />}
        label={"Total Income"}
        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
        color={"bg-green-800"}
         />

           <InfoCard 
        icon={<WalletCards />}
        label={"Total Expense"}
        value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
        color={"bg-red-800"}
         />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* Recent Transaction  */}
        <RecentTransactions transactions={dashboardData?.recentTransactions} onMore={() => navigate("/expense")} />

        {/* Finance overview chart  */}
        <FinanceOverview 
        totalBalance={dashboardData?.totalBalance} 
        totalIncome={dashboardData?.totalIncome} 
        totalExpense={dashboardData?.totalExpense} 
        />

        {/* Expense transactions  */}
        <Transactions transactions={dashboardData?.recent5Expenses} onMore={() => navigate("/expense")} type={"expense"} title={"Recent Expenses"}/>

        {/* Income transactions  */}
         <Transactions transactions={dashboardData?.recent5Incomes} onMore={() => navigate("/income")} type={"income"} title={"Recent Incomes"}/>


      </div>
    </div>
    )}
  </Dashboard>
  )
};

export default Home;
