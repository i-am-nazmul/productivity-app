"use client";
import React, { useState } from "react";
import { useDuartionInput,useAddGoalInput } from "@/store/store";

export default function WorkCalendar() {
  // State for current year & month
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const { displayDurationInput, hideDurationInput, showDurationInput } = useDuartionInput();
  const { displayGoalInput, showGoalInput, hideGoalInput } = useAddGoalInput();



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
    console.log(day);
    console.log(clickedDate.toLocaleString()); // Log date
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  return (
    <div className="px-6">
      {/* Header with arrows */}
      <div className="flex justify-between">

        <div className="flex justify-center items-center space-x-6 mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          ←
        </button>

        <h1 className="text-4xl font-bold tracking-tighter text-gray-600 text-center m-4">
          {getMonthName(currentMonth)} {currentYear}
        </h1>

        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          →
        </button>
        
      </div>

        <h1 className="text-4xl font-bold tracking-tighter text-gray-600 text-center m-4">Goal : </h1>

      </div>
      

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 ">
        {Array.from({ length: daysInMonth }, (_, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(index + 1)}
            className="w-12 h-12 flex items-center justify-center hover:bg-gray-500 hover:text-white text-gray-700 font-bold text-2xl font-sans rounded-full cursor-pointer border border-gray-300"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

