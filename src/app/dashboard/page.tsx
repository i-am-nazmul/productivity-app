"use client"
import React, { useEffect } from "react";
import WorkCalendar from "@/components/WorkCalendar";
import Chart from "@/components/Chart";
import Goals from "@/components/Goals";
import AddNewGoal from "@/components/AddNewGoal";
import AddGoalData from "@/components/AddGoalData";
import {useGoalList,useAddGoalInput,useDuartionInput,useCurrentGoal,useCurrentDate,useIsLoading,useLoaderMessage} from "@/store/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { useGetAllGoals } from "@/store/global_functions";



export default function DashboardPage(){
      const [newGoal,setNewGoal]=React.useState('');
      const [duration,setDuration] = React.useState(0);
      const { goals } = useGoalList();
      const { displayGoalInput, showGoalInput } = useAddGoalInput();
      const { displayDurationInput, hideDurationInput } = useDuartionInput();
      const {currentGoal}= useCurrentGoal();
      const {currentDate} = useCurrentDate();
      const {isLoading,setIsLoading}=useIsLoading();
      
      const {loaderMessage,setLoaderMessage}=useLoaderMessage();
      const getAllGoals = useGetAllGoals();
      const router = useRouter();



//add a new goal 
      const addNewGoal = async function(){
            if(!newGoal){
                  toast.error("Please add a valid goal!");
                  return;

            }
            setLoaderMessage('Adding your goal');
            setIsLoading(true);
            setNewGoal("");
            try {
                  await axios.post('/api/new-goal',{
                        "newGoal" : newGoal
                  });
                  getAllGoals();
                  toast.success("Successfully added a new goal!");
                  console.log("New task has been added succesfully !!")

            } catch (error) {
                  console.log("Failed to add new error : ", error);
            }

            setIsLoading(false);
      }




      
      //function for saving the details of a goal 
      const saveGoalDetails = async function (){
            if(!duration){
                  toast.error("Please enter valid duration!");
                  return ;

            }
            if(!currentDate ){
                  toast.error("Please select a valid date!");
                  return;

                  
            }
            

            
            setLoaderMessage('Adding your progress');
            setIsLoading(true);
            try {
                  const request = await axios.post('/api/goal-data',{
                        "goalName" : currentGoal,
                        "duration" : duration,
                        "date" : currentDate
                  });

                  if(request.status === 201){
                        console.log("Data for the task is updated");
                        setDuration(0);
                        hideDurationInput();
                        showGoalInput();

                  }
                  toast.success("Successfully added your data!");
                  console.log("Data for the task is updated")

            } catch (error) {
                  console.log("Failed to add new error : ", error);
            }
            setIsLoading(false);
      }


      const moveToProfilePage = function(){
            router.push('/profile')          ;
            }


      useEffect(() => {
      getAllGoals();
      // setIsLoading(false);
      
      },[getAllGoals]);

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
                                    className="bg-amber-400 rounded-full cursor-pointer shadow-md hover:shadow-lg "
                                    onClick={moveToProfilePage}
                                    />


                              </div>
                        </div>
                        
                        {/* body  */}
                        <div className="w-full h-full flex flex-row items-center gap-4 mt-4">


                              <div className="bg-white w-2/5 h-full border border-gray-200 rounded-sm shadow-md">
                                    <Goals goals = {goals}/>
                              </div>



                              <div className="bg-white w-1/5 h-full flex justify-center items-center rounded-sm">
                                    <Image src="/working.png"
                                    width={200}
                                    height={200}
                                    alt="work"
                                    />
                              </div>

                              <div className="w-2/5 h-full border border-gray-200 rounded-sm shadow-md flex flex-col gap-4 p-2">
                                    <WorkCalendar/>
                                    <Chart/>
                              </div>


                        </div>
                  </div>
                  {isLoading && (<Loader message={loaderMessage}/>)}
            </div>
            
      )
}