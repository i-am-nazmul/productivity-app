import React from 'react'
import { useIsConfirming } from '@/store/store'


type Goal ={
      goal:string 
} 
const Confirmation = ({ goal }: Goal) => {
  const { isConfirming, setIsConfirming } = useIsConfirming();

  const handleClose = () => {
    setIsConfirming(false);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50 '>
     <div className='bg-white flex flex-col items-center justify-center rounded-lg shadow-lg p-6 max-w-sm text-center'>
       <h1 className='text-4xl font-bold tracking-tighter text-gray-900 text-center m-4'  >
            Do you want to delete {goal}?
      </h1>
      <div className='flex gap-4 justify-center w-full mt-4'>
            <button className='bg-gray-900 text-white px-4 py-1 rounded-md text-4xl cursor-pointer' onClick={handleClose}>No</button>
            <button className='bg-gray-900 text-white px-4 py-1 rounded-md text-4xl cursor-pointer ' onClick={handleClose}>Yes</button>
      </div>
     </div>
    </div>
  )
}

export default Confirmation