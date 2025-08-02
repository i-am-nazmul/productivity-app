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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Calendar</h1>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }, (_, index) => (
          <div
            key={index}
            className="w-10 h-10 flex items-center justify-center bg-emerald-300 text-white font-bold rounded"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
