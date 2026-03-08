import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
        <p className='text-sm'>{content}</p>
        <div className='flex justify-end mt-6'>
            <button
            onClick={onDelete}
            type='button'
            className='bg-purple-800 py-2 px-4 rounded-lg text-white active:scale-95 hover:scale-105 transition-all duration-200'
            >
                Delete

            </button>
        </div>
    </div>
  )
}

export default DeleteAlert