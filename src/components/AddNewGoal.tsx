import React from 'react'
import { useState } from 'react'

const AddNewGoal = () => {
      const [newGoal,setNewGoal]=React.useState();

  return (
    <>
      <input type="text" name="" value={newGoal} onChange={(e)=>{setNewGoal(e.target.value)}} placeholder="Enter the new Goal" className="outline-none bg-amber-200 pr-8 py-2 pl-4 text-2xl rounded-sm"/>
      <button className="bg-emerald-900 text-white rounded-sm cursor-pointer px-4 py-2 text-2xl " onClick={addNewGoal}>Add</button>
    </>
  )
}

export default AddNewGoal