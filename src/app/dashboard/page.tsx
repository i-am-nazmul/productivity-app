"use client"
import React from "react";
import WorkCalendar from "@/components/WorkCalendar";

export default function DashboardPage(){

      const [newGoal,setNewGoal]=React.useState('');
      const [goals,setGoals]=React.useState<string[]>([]);
      const addNewGoal = function(){
            
            setGoals([...goals,newGoal]);
            setNewGoal("");

      }

      return (
            //outermost div
            <div className="h-screen w-screen p-1">
                  {/* this div conatains all the elements */}
                  <div className="w-full h-full rounded-sm border border-gray-400 flex flex-col px-4 py-2">
                        
                        <div className="flex justify-between">
                              <h1 className="text-7xl font-bold text-gray-700 tracking-tighter">Dashboard</h1>

                              <div className=" flex gap-2 items-center">
                                    <input type="text" name="" value={newGoal} onChange={(e)=>{setNewGoal(e.target.value)}} placeholder="Enter the new Goal" className="outline-none bg-amber-200 pr-8 py-4 pl-4 text-2xl rounded-xs"/>

                                    <button className="bg-emerald-900 text-white rounded-xs pr-8 py-4 pl-4 text-2xl" onClick={addNewGoal}
                                    >Add</button>
                              </div>
                        </div>
                        

                        <div className="w-full h-full flex flex-row items-center gap-4 mt-4">

                              <div className="bg-white w-full h-full border border-gray-200 rounded-sm flex flex-col justify-between">

                                    <div>
                                          <h1 className="text-4xl font-bold tracking-tighter text-gray-600 text-center m-4">Goals</h1>
                                          <ul className="font-mono tracking-tight px-4 ">

                        
                                                
                                                {goals.map((goal, index) => (
                                                <li key={index}>
                                                <button className="cursor-pointer bg-amber-200 w-full text-start px-6 py-2 rounded-xs">
                                                      {goal}
                                                </button>
                                                </li>
                                                ))}
                                          </ul>
                                    </div>

                                    <button className="font-mono tracking-tight bg-emerald-900 text-white cursor-pointer px-2">Add new goal</button>


                              </div>



                              <div className="bg-white w-full h-full border border-gray-200 rounded-sm">
                                    <WorkCalendar/>
                                    
                              </div>

                        </div>
                  </div>
            </div>
            
      )
}