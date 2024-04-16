import React from 'react'
import tempImg from '../assets/images/Avatar.svg'
export default function NameField(props) {
  return (
    <div className='flex gap-[0.62rem] items-center'>
        <div>
            {/* get image from props */}
            <img src={tempImg} alt="img"/>
        </div>
        <div className='flex flex-col items-start'>
            <p className='text-[#4B465C] text-[0.9375rem] font-[600] leading-[1.375rem]'>{props.name}</p>
            <span className='text-[#4B465C] text-[0.8125rem] font-[400] leading-[1.25rem]'>{props.occupation}</span>
        </div>
    </div>
  )
}
