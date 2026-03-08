import { X } from 'lucide-react';
import React from 'react'

const Model = ({children, isOpen, onClose, title}) => {
    if(!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm'>

        <div className='relative p-4 w-full max-w-2xl max-h-[90vh]'>

            <div className='relative bg-white rounded-xl shadow-2xl border border-gray-100 px-2'>
                <div className='flex items-center justify-between p-5 md:p-6 border-gray-100 rounded-t-xl'>
                    <h3 className='text-xl font-semibold text-gray-800'>
                        {title} 
                    </h3>
                    <button 
                    onClick={onClose}
                    type='button'
                    className='text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg text-sm w-9 h-9 inline-flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                        <X className='size-6' />
                    </button>

                </div>
                <div className='w-full h-0.5 bg-purple-200'/>

                <div className='p-5 md:p-6 text-gray-700'>
                    {children}

                </div>

            </div>

        </div>

    </div>
  )
}

export default Model