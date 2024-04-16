import React from 'react'

export default function PrimaryButton(props) {
  return (
    <button className='flex justify-center items-center text-text text-[1rem] font-[600] leading-[1.5rem] bg-primary-brand w-full p-[1rem] rounded-md' onClick={props.action}>
        {props.label}
    </button>
  )
}
