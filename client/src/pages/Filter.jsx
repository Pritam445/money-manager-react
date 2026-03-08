import React, { useState } from 'react'
import Dashboard from '../components/Dashboard'
import { Loader2, Search } from 'lucide-react'
import { axiosConfig } from '../util/config';
import { API_ENPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import TransactionInfoCard from '../components/TransactionInfoCard';
import moment from 'moment';


const Filter = () => {

  const [type, setType] = useState('income');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const response = await axiosConfig.post(API_ENPOINTS.FILTER_TRANSACTIONS, {type, startDate, endDate, keyword, sortField, sortOrder});

      setTransactions(response.data);
      toast.success("Transactions fetched successfully");

      // console.log("Transactions: ", response.data);

      
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
      toast.error(error.response?.data?.message || "Failed to fetch transactions.");
      
    }finally{
      setLoading(false);
    }


  }
  
  return (
  <Dashboard activeMenu="Filter">
    <div className='my-5 mx-auto'>
      <div className='flex justify-between px-4 items-center mb-4'>
        <h2 className='text-2xl font-semibold'>Filter Transactions</h2>
         <div className='sm:col-span-1 md:col-span-2 flex items-end'>
            <div className='w-full'>
              {/* <label htmlFor="keyword" className='block text-sm font-medium mb-1'>Search</label> */}
              <input onChange={(e) => setKeyword(e.target.value)} value={keyword} type="text" placeholder='Search...' className='w-full border rounded-lg px-3 py-2' />
            </div>
            <button onClick={handleSearch} className='ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-900 text-white rounded-lg flex items-center justify-center cursor-pointer'>
              {loading ? (
                <div className='flex gap-2 items-center justify-center' >
                  <Loader2 size={20} className='text-white animate-spin' /> 
                </div>
              ) : <Search size={20} />}
            </button>
          </div>
      </div>
      <div className='p-4 mb-4 bg-white shadow-md rounded-lg'>
        <div className='flex items-center justify-between mb-4'>
          <h5 className='text-lg font-semibold'>Select the filters</h5>
        </div>

        <form className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4' >
          <div className=''>
            <label className='block text-sm font-medium mb-1' htmlFor="type">Type</label>
            <select onChange={(e) => setType(e.target.value)} value={type} className='w-full border rounded-md py-2 px-3' id="type">
              {/* <option value="all">All</option> */}
              <option value="income" defaultChecked>Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className='block text-sm font-medium mb-1'>Start Date</label>
            <input onChange={(e) => setStartDate(e.target.value)} value={startDate} id='startDate' type="date" className='w-full border rounded-md px-3 py-2' />
          </div>

          <div>
            <label htmlFor="endDate" className='block text-sm font-medium mb-1'>End Date</label>
            <input onChange={(e) => setEndDate(e.target.value)} value={endDate} id='endDate' type="date" className='w-full border rounded-md px-3 py-2' />
          </div>

          <div>
            <label htmlFor="sortField" className='block text-sm font-medium mb-1'>Sort By</label>
            <select onChange={(e) => setSortField(e.target.value)} value={sortField}  className='w-full border rounded-md py-2 px-3' id="sortField">
              <option value="date" defaultChecked>Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div>
            <label htmlFor="sortOrder" className='block text-sm font-medium mb-1'>Sort Order</label>
            <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}  className='w-full border rounded-md py-2 px-3' id="sortOrder">
              <option value="asc" defaultChecked>Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

         

        </form>

      </div>
      <div className='bg-white p-4 rounded-lg shadow-md'>
        <div className='flex items-center justify-between mb-2'>
          <h5 className='text-lg font-semibold'>Transactions</h5>
        </div>

        {transactions.length === 0 && !loading ? (
          <p className='text-gray-500'>Select the filters and click apply to filter the transactions</p>

        ) : (
          <div>
            <p></p>
          </div>
        )}

        {
          loading ? (
            <p className='text-gray-500'>Loading Transactions</p>

          ) : (
            ""
          )
        }

        {transactions.map((transaction) => (
          <TransactionInfoCard
          key={transaction.id}
          title={transaction.name}
          icon={transaction.icon}
          date={moment(transaction.date).format("Do MMM YYYY")}
          amount={transaction.amount}
          type={type}
          
           />
        ))}

      </div>

    </div>
  </Dashboard>
  )
}

export default Filter