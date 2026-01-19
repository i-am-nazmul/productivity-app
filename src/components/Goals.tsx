import {  useCurrentGoal,useIsConfirming} from "@/store/store"
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


      const handleCrossClick= function(goal:string){
            setGoalToDelete(goal);
            setIsConfirming(true);  
      }

      
      
      
       return (
    <div className="flex h-full flex-col justify-between p-2 sm:p-4">
      <div>
        <h1 className="m-2 text-center text-2xl font-bold tracking-tight text-gray-600 sm:m-4 sm:text-3xl lg:text-4xl">
          Goals
        </h1>

        {goals && goals.length ? (
          <ul className="max-h-64 w-full overflow-y-auto rounded-sm bg-amber-200 px-2 py-2 font-mono tracking-tight sm:px-4 sm:py-3 lg:max-h-none lg:w-max lg:overflow-visible">
            {goals.map((goalObj) => (
              <li
                key={goalObj._id}
                className={`my-2 flex items-center justify-between rounded-lg pr-2 sm:pr-4 ${
                  currentGoal === goalObj.goal
                    ? "bg-gray-900 text-white shadow-md"
                    : "hover:bg-amber-300"
                }`}
              >
                <button
                  className="w-full cursor-pointer rounded-sm px-3 py-2 text-left text-base sm:font-medium tracking-tight sm:px-4 sm:text-5xl lg:px-6 lg:py-2"
                  onClick={() => setCurrentGoal(goalObj.goal)}
                >
                  {goalObj.goal}
                </button>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer rounded-sm bg-gray-900 text-white sm:size-8 lg:size-10"
                  onClick={() => handleCrossClick(goalObj.goal)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </li>
            ))}
          </ul>
        ) : (
          <h1 className="max-w-xs rounded-sm bg-amber-200 px-4 text-center font-mono text-lg font-bold tracking-tight text-gray-600 sm:text-xl lg:text-2xl">
            Please add your Goals
          </h1>
        )}
      </div>

      {isConfirming && <Confirmation goal={goalToDelete} />}
    </div>
  );
}