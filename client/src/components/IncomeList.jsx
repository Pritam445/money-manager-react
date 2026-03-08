import { Download, Loader2, Mail } from 'lucide-react'
import React, { useState } from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'
import toast from 'react-hot-toast'

const IncomeList = ({transactions, onDelete, onDownload, onEmail}) => {

    const [loadingDownload, setLoadingDownload] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);
    const handleEmail = async () => {
        setLoadingEmail(true);
        try {

            await onEmail();
           
            
        } catch (error) {
            console.log(error)
           
            
        }finally {
            setLoadingEmail(false)
        }
        

    }

    const handleDownload = async () => {
          setLoadingDownload(true);
        try {

            await onDownload();
            toast.success("Downloaded successfully");
            
        } catch (error) {
             console.log(error)
             toast.error("Failed to download");
            
        }finally {
            setLoadingDownload(false)
        }

    }
   
   
  return (
    <div className='w-full bg-white rounded-lg p-4 shadow-lg'>
        <div className='flex-items-center justify-between'> 
            <h5 className='text-xl font-bold'>Income Sources</h5>
            <div className='flex items-center justify-end gap-2'>
                <button type='button' disabled={loadingEmail} onClick={handleEmail} className='bg-purple-100 p-2 rounded-lg border flex items-center justify-center active:scale-95 hover:scale-105 transition-all duration-200 gap-3 border-gray-200 cursor-pointer'>
                    {loadingEmail ? (

                        <>
                        <Loader2 size={15} className='text-base animate-spin text-purple-800' /> Emailing...
                        </>

                    ) : (
                        <>
                        <Mail size={15} className='text-base  text-purple-800' /> Email
                        </>
                        

                    )}
                </button>

                 <button type='button' disabled={loadingDownload} onClick={handleDownload} className='bg-purple-100 flex gap-3 items-center justify-center active:scale-95 hover:scale-105 transition-all duration-200 p-2 rounded-lg border border-gray-200 cursor-pointer'>
                    {loadingDownload ? (

                        <>
                        <Loader2 size={15} className='text-base animate-spin text-purple-800' /> Downloading...
                        </>

                    ) : (
                        <>
                        <Download size={15} className='text-base text-purple-800' /> Download
                        </>

                    )}
                    
                </button>

            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((transaction) => (
                <TransactionInfoCard
                 key={transaction.id}
                 icon={transaction.icon}
                 title={transaction.name}
                 date={moment(transaction.date).format("MMM DD, YYYY")}
                 amount={transaction.amount}
                 type="income"
                 onDelete = {() => onDelete(transaction.id)}
                 />
            ))}

        </div>

    </div>
  )
}

export default IncomeList