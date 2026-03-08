import React from 'react'
import CustomPieChart from './CustomPieChart'
import { addThousandsSeparator } from '../util/addThousandsSeparator'

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const COLORS = ["#59168B","#016630","#a0090e"]

    const balanceData = [
        {name: "Total Balance", value: totalBalance, color: COLORS[0], icon: "₹"},
        {name: "Total Income", value: totalIncome, color: COLORS[1], icon: "₹"},
        {name: "Total Expense", value: totalExpense, color: COLORS[2], icon: "₹"},
    ]
  return (
    <div className='bg-white p-4 rounded-lg shadow-md '>

        <div className='flex items-center justify-between '>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>

        <CustomPieChart
        data = {balanceData}
        label = "Total Balance"
        totalAmount = {`${balanceData[0].icon} ${addThousandsSeparator(totalBalance)}`}
        colors = {COLORS}
        showTextAnchor
         />
        
    </div>
  )
}

export default FinanceOverview