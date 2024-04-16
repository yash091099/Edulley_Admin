import React from 'react'

export default function ReportCard(props) {
  return (
    <div className='bg-white p-[2rem] rounded-[1rem]'>
        <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-[0.12rem]'>
                <p className={`text-[1rem] font-[600] ${props.darkHeading ? "":"text-[#A5A5A5]"}`}>{props.label}</p>
                <h1 className='text-primary-brand text-[2.5rem] text-[#FF6477] font-[500]'>{props.value}</h1>
            </div>
            <div className='px-[1.5rem] py-[0.5rem] bg-[#F9F9F9] rounded-md'>
                <select className='bg-transparent'>
                    {props.filterOptions.map(i=><option key={i}>{i}</option>)}
                </select>
            </div>
        </div>
        <div>
            {props.children}
        </div>
    </div>
  )
}
