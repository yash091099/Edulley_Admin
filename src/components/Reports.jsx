import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { month: 'Jan', Students: 0,Revenue:0 },
  { month: 'Feb', Students: 0 ,Revenue:0},
  { month: 'Mar', Students: 0,Revenue:0 },
  { month: 'Apr', Students: 0 ,Revenue:0},
  { month: 'May', Students: 0 ,Revenue:0},
  { month: 'Jun', Students: 0 ,Revenue:0},
  { month: 'Jul', Students: 0,Revenue:0 },
  { month: 'Aug', Students: 0,Revenue:0 },
  { month: 'Sep', Students: 0,Revenue:0 },
  { month: 'Oct', Students: 0,Revenue:0 },
  { month: 'Nov', Students: 0,Revenue:0 },
  { month: 'Dec', Students: 0 ,Revenue:0},
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, index) => currentYear + index);

export default function Reports() {
  const [selectedYear, setSelectedYear] = React.useState(currentYear);
  return (
    <div className='flex flex-col gap-[2rem] mx-[1rem]'>
      <div className='bg-white rounded-[1rem] w-full'>
        <h1 className='text-[1.5rem] font-[600] px-[2rem] pt-[2rem]'>Analytics & Reports</h1>
        <div className='bg-white p-[2rem] rounded-[1rem]'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-[0.12rem]'>
          <p className={`text-[1rem] font-[600]`}>All users</p>
          <h1 className='text-primary-brand text-[2.5rem] font-[500]'>0</h1>
        </div>
        <div className='px-[1.5rem] py-[0.5rem] bg-[#F9F9F9] rounded-md'>
          <select className='bg-transparent' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ height: '300px', marginTop: '1rem' }}>
      <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 'dataMax + 100']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Students" stroke="#FF6477"  strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
        <div className='bg-white p-[2rem] rounded-[1rem]'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-[0.12rem]'>
          <p className={`text-[1rem] font-[600]`}>Total Revenue</p>
          <h1 className='text-primary-brand text-[2.5rem] font-[500]'>0</h1>
        </div>
        <div className='px-[1.5rem] py-[0.5rem] bg-[#F9F9F9] rounded-md'>
          <select className='bg-transparent' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ height: '300px', marginTop: '1rem' }}>
      <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 'dataMax + 100']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Revenue" stroke="#FF6477"  strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
     
      </div>
    </div>
  );
}
