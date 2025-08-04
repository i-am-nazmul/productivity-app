"use client"
import React, { useEffect } from "react";
import WorkCalendar from "@/components/WorkCalendar";
import Goals from "@/components/Goals";
import useGoalList from "@/store/store";
import axios from "axios";
import Image from "next/image";


export default function DashboardPage(){

      const [newGoal,setNewGoal]=React.useState('');
      const {goals,addGoal}=useGoalList();



//add a new goal 
      const addNewGoal = async function(){
            
            addGoal(newGoal);
            setNewGoal("");
            try {
                  await axios.post('/api/new-goal',{
                        "newGoal" : newGoal
                  });
                  console.log("New task has been added succesfully !!")

            } catch (error:any) {
                  console.log("Failed to add new error : ", error);
            }

      }

// function for rendering all goals 
      const allGoals = async function (){
            const response = await axios.get('/api/get-goals');
            const goalArray = response.data.goals;

            for (let i = 0; i < goalArray.length; i++) {
                  addGoal(goalArray[i].goal);
            }
            
            
      }


      useEffect(()=>{
            allGoals();
      },[])

      return (
            //outermost div
            <div className="h-screen w-screen p-1">
                  {/* this div conatains all the elements */}
                  <div className="w-full h-full rounded-sm border border-gray-400 flex flex-col px-4 py-2">

                        
                        
                        <div className="flex justify-between ">
                              <h1 className="text-7xl font-bold text-gray-700 tracking-tighter">Dashboard</h1>

                              <div className=" flex gap-2 items-center">
                                    <input type="text" name="" value={newGoal} onChange={(e)=>{setNewGoal(e.target.value)}} placeholder="Enter the new Goal" className="outline-none bg-amber-200 pr-8 py-2 pl-4 text-2xl rounded-xs"/>

                                    <button className="bg-emerald-900 text-white rounded-xs pr-8 py-2 pl-4 text-2xl" onClick={addNewGoal}
                                    >Add</button>
                              </div>
                        </div>
                        

                        <div className="w-full h-full flex flex-row items-center gap-4 mt-4">


                              <div className="bg-white w-2/5 h-full border border-gray-200 rounded-sm ">
                                    <Goals goals = {goals}/>
                              </div>



                              <div className="bg-white w-1/5 h-full flex justify-center items-center rounded-sm">
                                    <Image src="/working.png"
                                    width={200}
                                    height={200}
                                    alt="work"
                                    />
                              </div>

                              <div className="bg-white w-2/5 h-full border border-gray-200 rounded-sm">
                                    <WorkCalendar/>
                              </div>


                        </div>
                  </div>
            </div>
            
      )
}