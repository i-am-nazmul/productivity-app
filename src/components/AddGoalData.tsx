import React from 'react'
type RequiredVariablesAndFunctions={
      setDuration : (value : number) => void;
      saveGoalDetails : () => void;
}
const AddGoalData = ({setDuration,saveGoalDetails}:RequiredVariablesAndFunctions) => {
  return (
      <form onSubmit={
            (e)=>{
                  e.preventDefault();
                  saveGoalDetails();
            }
      }>
            <input type="number" name="" placeholder="Enter duration in Hours" className="outline-none bg-amber-200 pr-8 py-2 pl-4 text-2xl rounded-sm"onChange={(e)=>{setDuration(Number(e.target.value))}}/>
            <button className="bg-emerald-900 text-white rounded-sm cursor-pointer px-4 py-2 text-2xl " type='submit'>Add</button> 
      </form>
  )
}

export default AddGoalData