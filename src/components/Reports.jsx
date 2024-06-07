import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getStudentByMonth } from '../context/services/client';
import CustomLoader from './loader';
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, index) => currentYear + index);

export default function Reports() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getStudentByMonth(selectedYear);
      if (response.status === 200) {
        console.log(response.data);
        setData(response.data.data);
        const total = response.data.data.reduce((acc, item) => acc + item.students, 0);
        setTotalUsers(total);
      setLoading(false);

      } else {
        console.error("Failed to fetch data:", response.message);
      setLoading(false);

      }
    };

    fetchData();
  }, [selectedYear]);

  return (
    <div className='flex flex-col gap-[2rem] mx-[1rem]'>
      {loading && <CustomLoader />}
      <div className='bg-white rounded-[1rem] w-full'>
        <h1 className='text-[1.5rem] font-[600] px-[2rem] pt-[2rem]' style={{fontFamily:"Gilroy-Bold"}}>Analytics & Reports</h1>
        <div className='bg-white p-[2rem] rounded-[1rem]'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-[0.12rem]'>
              <p className={`text-[1rem] font-[600]`} style={{fontFamily:"Gilroy-Bold"}}>All users</p>
              <h1 className='text-primary-brand text-[2.5rem] font-[500]' style={{fontFamily:"Gilroy-Medium"}}>{totalUsers}</h1>
            </div>
            <div className='px-[1.5rem] py-[0.5rem] bg-[#F9F9F9] rounded-md'>
              <select style={{fontFamily:"Gilroy-Medium"}} className='bg-transparent' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
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
                <XAxis dataKey="name" />
                <YAxis domain={[0, 'dataMax + 5']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#FF6477" strokeWidth={4} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* <div className='bg-white p-[2rem] rounded-[1rem]'>
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
        </div> */}
      </div>
    </div>
  );
}
