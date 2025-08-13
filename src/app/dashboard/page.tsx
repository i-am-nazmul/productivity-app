"use client"
import React, { useEffect } from "react";
import WorkCalendar from "@/components/WorkCalendar";
import Goals from "@/components/Goals";
import {useGoalList,useAddGoalInput,useDuartionInput} from "@/store/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function DashboardPage(){
      const [newGoal,setNewGoal]=React.useState('');
      const { goals, addGoal, setGoals } = useGoalList();
      const { displayGoalInput, showGoalInput, hideGoalInput } = useAddGoalInput();
      const { displayDurationInput, hideDurationInput, showDurationInput } = useDuartionInput();

      const router = useRouter();



//add a new goal 
      const addNewGoal = async function(){

            hideGoalInput()
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
      const allGoals = async function () {
      const response = await axios.get('/api/get-goals');
      const goalArray = response.data.goals;

      

      // Convert to array of strings
      const goalTextArray = goalArray.map((item: any) => item.goal);

      

      // Replace state instead of appending
      setGoals(goalTextArray);
      };

      const moveToProfilePage = function(){
            router.push('/profile')          ;
            }


      useEffect(() => {
      allGoals();
      }, []);

      return (
            //outermost div
            <div className="h-screen w-screen p-1">
                  {/* this div conatains all the elements */}
                  <div className="w-full h-full rounded-sm border border-gray-400 flex flex-col px-4 py-2">

                        
                        {/* Top Navbar like  */}
                        <div className="flex justify-between ">
                              <h1 className="text-7xl font-bold text-gray-700 tracking-tighter">Dashboard</h1>

                              <div className=" flex gap-2 items-center">
                                    

                                    {displayGoalInput && (
                                          <>
                                                <input type="text" name="" value={newGoal} onChange={(e)=>{setNewGoal(e.target.value)}} placeholder="Enter the new Goal" className="outline-none bg-amber-200 pr-8 py-2 pl-4 text-2xl rounded-sm"/>

                                                <button className="bg-emerald-900 text-white 
                                                rounded-sm cursor-pointer px-4 py-2 text-2xl " onClick={addNewGoal}
                                                >Add</button>
                                          </>
                                    )}

                                    {displayDurationInput && (
                                          <>
                                                <input type="text" name="" placeholder="Enter duration in Hours" className="outline-none bg-amber-200 pr-8 py-2 pl-4 text-2xl rounded-sm"/>

                                                <button className="bg-emerald-900 text-white 
                                                rounded-sm cursor-pointer px-4 py-2 text-2xl " 
                                                onClick={hideDurationInput}
                                                >Add</button> 
                                          </>
                                    )}

                                    <Image src="/download.png"
                                    width={70}
                                    height={200}
                                    alt="work"
                                    className="bg-amber-400 rounded-full cursor-pointer"
                                    onClick={moveToProfilePage}
                                    />


                              </div>
                        </div>
                        
                        {/* body  */}
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

                              <div className="w-2/5 h-full border border-gray-200 rounded-sm">
                                    <WorkCalendar/>
                              </div>


                        </div>
                  </div>
            </div>
            
      )
}