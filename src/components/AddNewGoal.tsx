import React from 'react'

type RequiredVariablesAndFunctions = {
  newGoal : string;
  setNewGoal : (value : string)=> void ;
  addNewGoal : ()=> void ;
}

const AddNewGoal = ({newGoal,setNewGoal,addNewGoal}:RequiredVariablesAndFunctions) => {
      

  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      addNewGoal();
    }}>
      <input type="text" name="" value={newGoal} onChange={(e)=>{setNewGoal(e.target.value)}} placeholder="Enter the new Goal" className="outline-none bg-amber-200 pr-8 py-2 pl-4 text-2xl rounded-sm"/>
      <button className="bg-emerald-900 text-white rounded-sm cursor-pointer px-4 py-2 text-2xl " type='submit'>Add</button>
    </form>
  )
}

export default AddNewGoal