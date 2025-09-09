import React from 'react';
import { BarLoader } from 'react-spinners';

type Message ={
      message:string 
} 

const Loader = ({message}:Message) => {
  return (
    <div className='h-full flex justify-center items-center flex-col'><h1 className='text-4xl font-bold tracking-tighter text-gray-600 text-center m-4'>{message}</h1>
        <BarLoader/>
    </div>
  )
}

export default Loader