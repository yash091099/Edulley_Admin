import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReportCard({ label, value, data,name, filterOptions, selectedYear, setSelectedYear }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear + index);

  return (
    <div className='bg-white p-[2rem] rounded-[1rem]'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-[0.12rem]'>
          <p className={`text-[1rem] font-[600]`}>{label}</p>
          <h1 className='text-primary-brand text-[2.5rem] font-[500]'>{value}</h1>
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
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 'dataMax + 5']} />
            <Tooltip />
            <Line type="monotone" dataKey="students" stroke="#FF6477" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
