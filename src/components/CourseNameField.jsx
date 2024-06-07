import React from 'react'
import tempImg from '../assets/images/Avatar_Course.png'
export default function   NameFieldCourse(props) {
  return (
    <div className='flex gap-[0.62rem] items-center'>
        <div>
            <img src={props.courseLogo} alt="img"/>
            {/* get image from props */}
        </div>
        <div className='flex flex-col items-start'>
            <p  style={{fontFamily:"Gilroy-Medium"}} className='text-[#4B465C] text-[0.9375rem] font-[600] leading-[1.375rem]'>{props.courseName}</p>
            <span style={{fontFamily:"Gilroy-Medium"}}  className='text-[#4B465C] text-[0.8125rem] font-[400] leading-[1.25rem]'>{props.occupation}</span>
        </div>
    </div>
  )
}
