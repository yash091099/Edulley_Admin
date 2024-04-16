import React from 'react'
import PrimaryButton from './PrimaryButton'
import SuccessImage from '../assets/svg/success-icon.svg';
export default function SuccessModal(props) {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0'>
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/30' onClick={()=>{props.onClose(false)}}></div>
        <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col items-center gap-[2.5rem] bg-white w-[30rem] p-[2rem] rounded-[1rem]'>
                <img className="w-[7.5rem]" src={SuccessImage} alt="successfull" />
                <div className='flex flex-col gap-[0.44rem] justify-center items-center'>
                    <h1 className='text-[1.25rem] font-[700] leading-[1.75rem]'>Successful</h1>
                    <p className='text-[0.875rem] font-[500] leading-[116%]'>Your Article is Added successfully, Please check status</p>
                </div>
                <div className='flex flex-col gap-[1rem] w-full'>
                    <PrimaryButton label="Check Inventory" action={()=>{props.onClickAction(); props.onClose(false)}} />
                    <p className='cursor-pointer mx-auto text-[#8D98A4] text-[0.875rem] font-[500] leading-[116%]' onClick={()=>{props.onClose(false)}}>Close</p>
                </div>
        </div>
    </div>
  )
}
