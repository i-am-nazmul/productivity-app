import { useAddGoalInput,useDuartionInput, useCurrentGoal,useIsConfirming} from "@/store/store"
import React from "react";
import Confirmation from "./Confirmation";



export default function Goals({ goals }: { goals: { 
      _id: string; 
      owner : string ;
      goal: string;
      __v : string

 }[] })
{
      
      const {currentGoal,setCurrentGoal}=useCurrentGoal();

      const {isConfirming,setIsConfirming}=useIsConfirming();
      const [goalToDelete,setGoalToDelete]=React.useState("");


      const handleCrossClick=(goal:string)=>{
            setIsConfirming(true);
            setGoalToDelete(goal);
      }

      
      
      
      return (
            <div className="flex flex-col justify-between h-full">
                  <div >
                        <h1 className="text-4xl font-bold tracking-tighter text-gray-600 text-center m-4">Goals</h1>
                        {goals && goals.length ? <ul className="font-mono tracking-tight px-4 py-2 bg-amber-200 w-max rounded-sm">
                              {goals.map((goalObj) => (
                              <li key={goalObj._id}
                              className={`flex justify-between items-center my-2 pr-4 rounded-xl ${currentGoal === goalObj.goal? "bg-gray-900 text-white shadow-md": "hover:bg-amber-300"}`}>

                                    <button className={`cursor-pointer w-full text-start px-6 py-2 rounded-sm font-semibold text-5xl tracking-tighter`} onClick={() => setCurrentGoal(goalObj.goal)}>
                                          {goalObj.goal}


                                    </button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer size-10 bg-gray-900 rounded-sm w-15 text-white" onClick={() => handleCrossClick(goalObj.goal)} >
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    
                              </li>
                              ))}
                        </ul>  : <h1 className="text-2xl font-bold tracking-tighter bg-amber-200 max-w-max text-gray-600 text-center px-4 font-mono">Please add your Goals</h1>}

                  </div>
                  {isConfirming && <Confirmation goal={goalToDelete} />   }

                  
            </div>
      )
}