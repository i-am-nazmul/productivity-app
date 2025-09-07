import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useDatesWithDuration } from '@/store/store';

const Chart = () => {
  const { datesWithDuration } = useDatesWithDuration();

  // Sort by date
  const sortedDates = [...datesWithDuration].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  let data: any = [];

  // Get Nth date from today (negative means past)
  function getNthDateFromToday(n: number): Date {
    const today = new Date();
    today.setDate(today.getDate() + n);
    return today;
  }

  // Build data for the last 7 days
  for (let i = 0; i < 7; i++) {
    const targetDate = getNthDateFromToday(-i);

    // Try to find entry for this date
    const entry = sortedDates.find(
      (obj) => obj.date.toDateString() === targetDate.toDateString()
    );

    // If found, push it; otherwise, push duration = 0
    data.push({
      date: targetDate.toLocaleDateString(),
      duration: entry ? entry.duration : 0,
    });
  }


  data.reverse();

  

  return (
    <div style={{ width: '100%' }} className='mt-8'>
      <h4 className="text-3xl font-semibold tracking-tighter text-gray-600 text-center m-4">Progress over last 7 days</h4>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data} // 
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="duration" // <-- Y-axis value
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
