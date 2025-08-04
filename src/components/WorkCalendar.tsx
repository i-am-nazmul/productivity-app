"use client"
import React from "react";

export default function WorkCalendar() {
  // Get number of days in current month
  function getDaysInMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-based
    return new Date(year, month + 1, 0).getDate();
  }

  const daysInMonth = getDaysInMonth();

  return (
    <div className="px-4">
      <h1 className="text-4xl font-bold tracking-tighter text-gray-600 text-center m-4">Calendar</h1>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }, (_, index) => (
          <div
            key={index}
            className="w-12 h-12 flex items-center justify-center hover:bg-gray-500 hover:text-white text-gray-700 font-bold text-2xl font-sans rounded-full cursor-pointer border border-gray-300"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
