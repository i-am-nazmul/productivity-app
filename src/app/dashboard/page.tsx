"use client"
import React, { useEffect } from "react";
import WorkCalendar from "@/components/WorkCalendar";
import Chart from "@/components/Chart";
import Goals from "@/components/Goals";
import AddNewGoal from "@/components/AddNewGoal";
import AddGoalData from "@/components/AddGoalData";
import {useGoalList,useAddGoalInput,useDuartionInput,useCurrentGoal,useCurrentDate} from "@/store/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function DashboardPage(){
      const [newGoal,setNewGoal]=React.useState('');
      const [duration,setDuration] = React.useState(0);
      const { goals, setGoals } = useGoalList();
      const { displayGoalInput, showGoalInput, hideGoalInput } = useAddGoalInput();
      const { displayDurationInput, hideDurationInput, showDurationInput } = useDuartionInput();
      const {currentGoal,setCurrentGoal}= useCurrentGoal();
      const {currentDate} = useCurrentDate();
      const router = useRouter();



//add a new goal 
      const addNewGoal = async function(){

            // hideGoalInput();
            setNewGoal("");
            try {
                  await axios.post('/api/new-goal',{
                        "newGoal" : newGoal
                  });
                  allGoals();
                  console.log("New task has been added succesfully !!")

            } catch (error:any) {
                  console.log("Failed to add new error : ", error);
            }


      }


// function for rendering all goals 
      const allGoals = async function () {
      try {
      const response = await axios.get("/api/get-goals");

      if (response.data && response.data.goals) {
            const goalArray = response.data.goals;


            setGoals(goalArray);

            if (goalArray.length > 0) {
            setCurrentGoal(goalArray[0].goal);
            } else {
            setCurrentGoal("");
            }
      }
      } catch (error) {
      console.error("Failed to fetch goals:", error);
      }
      };

      
      //function for saving the details of a goal 
      const saveGoalDetails = async function (){
            
            
            
            try {
                  const request = await axios.post('/api/goal-data',{
                        "goalName" : currentGoal,
                        "duration" : duration,
                        "date" : currentDate
                  });

                  if(request.status === 201){
                        console.log("Data for the task is updated")
                        hideDurationInput();
                        showGoalInput();

                  }
                  
                  console.log("Data for the task is updated")

            } catch (error:any) {
                  console.log("Failed to add new error : ", error);
            }
      }


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

                        
                        {/* Top Navbar */}
                        <div className="flex justify-between ">
                              <h1 className="text-7xl font-bold text-gray-700 tracking-tighter">Dashboard</h1>

                              <div className=" flex gap-2 items-center">
                                    

                                    {displayGoalInput && (
                                          <AddNewGoal newGoal={newGoal} setNewGoal={setNewGoal} addNewGoal={addNewGoal}/>
                                    )}

                                    {displayDurationInput && (
                                          <AddGoalData setDuration={setDuration} saveGoalDetails={saveGoalDetails}/>
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
                                    <Chart/>
                              </div>


                        </div>
                  </div>
            </div>
            
      )
}