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
  <div className="min-h-screen w-screen bg-blue-200 p-1">
    {/* main card */}
    <div className="flex h-full min-h-[calc(100vh-0.5rem)] w-full flex-col rounded-sm border border-gray-400 bg-white px-2 py-2 sm:px-4 sm:py-4">

      
      {/* Top Navbar */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-5xl lg:text-7xl">
          Dashboard
        </h1>

        <div className="mt-2 flex w-full flex-col items-stretch gap-2 sm:mt-0 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          {displayGoalInput && (
            <AddNewGoal
              newGoal={newGoal}
              setNewGoal={setNewGoal}
              addNewGoal={addNewGoal}
            />
          )}

          {displayDurationInput && (
            <AddGoalData
              setDuration={setDuration}
              saveGoalDetails={saveGoalDetails}
            />
          )}

          <Image
            src="/download.png"
            width={70}
            height={200}
            alt="work"
            className="h-12 w-12 rounded-full bg-amber-400 cursor-pointer shadow-md hover:shadow-lg sm:h-14 sm:w-14"
            onClick={moveToProfilePage}
          />
        </div>
      </div>

      {/* body */}
      <div className="mt-4 flex w-full flex-col items-stretch gap-4 sm:flex-row">
        <div className="h-full w-full rounded-sm border border-gray-200 bg-white shadow-md sm:w-2/5">
          <Goals goals={goals} />
        </div>

        <div className="flex h-40 w-full items-center justify-center rounded-sm bg-white sm:h-auto sm:w-1/5">
          <Image src="/working.png" width={200} height={200} alt="work" />
        </div>

        <div className="flex h-full w-full flex-col gap-4 rounded-sm border border-gray-200 bg-white p-2 shadow-md sm:w-2/5">
          <WorkCalendar />
          <Chart />
        </div>
      </div>
    </div>

    {isLoading && <Loader message={loaderMessage} />}
  </div>
);
}