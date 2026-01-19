"use client";
import React, { useEffect,useCallback, useState } from "react";
import { useDuartionInput,useAddGoalInput ,useCurrentGoal,useCurrentDate,useDatesWithDuration} from "@/store/store";
import axios from "axios";
import toast from "react-hot-toast";



interface GoalDataItem {
  _id: string;
  goal: string;
  duration: number;
  date: string; 
  __v: number;
}

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

  setCurrentDate(clickedDate);
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



  const fetchGoalData = useCallback(async () => {
  const goalDataRequest = await axios.get(`/api/get-goal-data?goal=${currentGoal}`);
  const goalData = goalDataRequest.data.goalData;

  const datesAndDuration = goalData.map((item: GoalDataItem) => ({
    date: new Date(item.date),
    duration: item.duration,
  }));

  setDatesWithDuration(datesAndDuration);

  const dates = goalData.map((item: GoalDataItem) => new Date(item.date));
  setDatesToHighlight(dates);
}, [currentGoal, setDatesWithDuration, setDatesToHighlight]);




  useEffect(() => { 
  if (!currentGoal) return; 

    console.log("Yaha hu mai");
  fetchGoalData();

  
}, [currentGoal,displayDurationInput,fetchGoalData]); 





  const daysInMonth = getDaysInMonth(currentYear, currentMonth);


   return (
  <div className="px-2 sm:px-4">
    {/* Header with arrows */}
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="mb-2 flex items-center justify-center space-x-3 sm:mb-4 sm:space-x-4">
        <button
          onClick={handlePrevMonth}
          className="cursor-pointer rounded bg-gray-300 px-3 py-1 text-sm hover:bg-gray-400 sm:px-4 sm:py-2 sm:text-base"
        >
          ←
        </button>

        <h1 className="text-center text-xl font-bold tracking-tight text-gray-700 sm:text-2xl md:text-3xl lg:text-4xl">
          {getMonthName(currentMonth)} {currentYear}
        </h1>

        <button
          onClick={handleNextMonth}
          className="cursor-pointer rounded bg-gray-300 px-3 py-1 text-sm hover:bg-gray-400 sm:px-4 sm:py-2 sm:text-base"
        >
          →
        </button>
      </div>

      {!currentGoal ? (
        <h1 className="text-center text-base font-bold tracking-tight text-gray-700 sm:text-lg md:text-xl lg:text-3xl">
          Please add goals
        </h1>
      ) : (
        <h1 className="text-center text-base font-bold tracking-tight text-gray-700 sm:text-lg md:text-xl lg:text-3xl">
          Goal : {currentGoal}
        </h1>
      )}
    </div>

    {/* Calendar days */}
    <div className="mt-2 grid grid-cols-7 gap-1 sm:gap-2">
      {Array.from({ length: daysInMonth }, (_, index) => (
        <div
          key={index}
          onClick={() => handleDateClick(index + 1)}
          className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-700 cursor-pointer sm:h-9 sm:w-9 sm:text-sm md:h-10 md:w-10 md:text-base lg:h-12 lg:w-12 lg:text-2xl ${
            isDateHighlighted(index + 1)
              ? "bg-emerald-900 text-white"
              : "hover:bg-gray-500 hover:text-white"
          }`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  </div>
);

}
