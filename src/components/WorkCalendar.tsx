"use client";
import React, { useEffect, useState } from "react";
import { useDuartionInput,useAddGoalInput ,useCurrentGoal,useCurrentDate,useDatesWithDuration} from "@/store/store";
import axios from "axios";
import toast from "react-hot-toast";



export default function WorkCalendar() {
  // State for current year & month
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [datesToHighlight, setDatesToHighlight] = useState<Date[]>([]);






  const {  displayDurationInput,showDurationInput } = useDuartionInput();
  const { hideGoalInput } = useAddGoalInput();
  
  const {currentGoal}=useCurrentGoal();
  const {setCurrentDate} = useCurrentDate();
  const {setDatesWithDuration} = useDatesWithDuration();
  





  // Get number of days in any month
  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Get month name
  function getMonthName(month: number) {
    return new Date(currentYear, month).toLocaleString("default", { month: "long" });
  }
  
  // Handle month navigation
  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }



  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }



  // Handle date click
function handleDateClick(day: number) {
  showDurationInput();
  hideGoalInput();

  const clickedDate = new Date(currentYear, currentMonth, day);

  // normalize times (remove hours, minutes, seconds)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  clickedDate.setHours(0, 0, 0, 0);

  if (clickedDate > today) {
    toast.error("You cannot add something in the future!");
    setCurrentDate(null); // clear
    return;
  }

  setCurrentDate(clickedDate); // safe to set
}



    function isDateHighlighted(day: number) {
    const dateToCheck = new Date(currentYear, currentMonth, day).toDateString();
    for (let i = 0; i < datesToHighlight.length; i++) {
      const element = datesToHighlight[i];
      if(dateToCheck === element.toDateString()){
        return 1;
      }
      
    }
    return 0;
    }



  const fetchGoalData = async function (){
    const goalDataRequest =await axios.get(`/api/get-goal-data?goal=${currentGoal}`);
    const goalData = goalDataRequest.data.goalData;
    const datesAndDuration = goalData.map((item : any )=>({
      date : new Date (item.date),
      duration : item.duration 
    }))

    setDatesWithDuration(datesAndDuration);



    const dates = goalData.map((item:any)=>new Date(item.date));
    setDatesToHighlight(dates);

    }




  useEffect(() => { 
  if (!currentGoal) return; 
  fetchGoalData();
  console.log("Hello bhai , mai goal data laya hu ");
}, [currentGoal,displayDurationInput]); // dependency array





  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  // console.log("current goal hai ",currentGoal)

  return (
    <div className="px-6">
      {/* Header with arrows */}
      <div className="flex justify-between">

        <div className="flex justify-center items-center space-x-6 mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
        >
          ←
        </button>

        <h1 className="text-4xl font-bold tracking-tighter text-gray-700 text-center m-4">
          {getMonthName(currentMonth)} {currentYear}
        </h1>

        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
        >
          →
        </button>
        
      </div>

        {!currentGoal ?<h1 className="text-4xl font-bold tracking-tighter text-gray-700 text-center m-4">Please add goals</h1> : <h1 className="text-4xl font-bold tracking-tighter text-gray-700 text-center m-4">Goal : {currentGoal}</h1>}

      </div>
      

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 ">
        {Array.from({ length: daysInMonth }, (_, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(index + 1)}
            className={`w-12 h-12 flex items-center justify-center hover:bg-gray-500 hover:text-white text-gray-700 font-bold text-2xl font-sans rounded-full cursor-pointer border border-gray-300 ${isDateHighlighted(index+1) ? "bg-emerald-900 text-white" : "hover:bg-gray-500 hover:text-white text-gray-700"}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
