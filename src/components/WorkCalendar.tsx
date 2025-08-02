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
            className="w-12 h-12 flex items-center justify-center bg-yellow-400 hover:bg-amber-800 text-gray-700 font-bold text-2xl rounded-full cursor-pointer"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
