import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const RecentTransactions = ({transactions, onMore}) => {
  return (
    <div className='bg-white shadow-sm p-4 rounded-lg '>
        <div className='flex items-center justify-between'>
            <h4 className='text-lg'>Recent Transactions</h4>
            <button className='bg-purple-800 rounded-lg p-2 flex items-center justify-center gap-3 active:scale-95 transition-all duration-200 cursor-pointer  text-white' onClick={onMore}>
                More <ArrowRight className='text-base' size={15} />
            </button>

        </div>

        <div className='mt-6'>
            {transactions?.slice(0,5)?.map(item => (
                <TransactionInfoCard 
                key={item.id}
                title={item.name}
                icon={item.icon}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type={item.type}
                />
            ))}

        </div>
    </div>
  )
}

export default RecentTransactions