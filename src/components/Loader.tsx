import React from 'react';

type Message ={
      message:string 
} 

const Loader = ({message}:Message) => {
  return (
    <div>{message}</div>
  )
}

export default Loader