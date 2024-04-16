import React from 'react'
import PrimaryButton from './PrimaryButton'
import logoutImage from '../assets/svg/logout-icon.svg';
import { useNavigate } from 'react-router-dom';
export default function LogoutModal(props) {
    const navigate = useNavigate();
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0'>
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/30' onClick={()=>{props.onClose(false)}}></div>
        <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col items-center gap-[2.5rem] bg-white w-[30rem] p-[2rem] rounded-[1rem]'>
                <img className="w-[7.5rem]" src={logoutImage} alt="logout" />
                <div className='flex flex-col gap-[0.44rem] justify-center items-center'>
                    <h1 className='text-[1.25rem] font-[700] leading-[1.75rem]'>Log Out?</h1>
                    <p className='text-[0.875rem] font-[500] leading-[116%]'>Are your sure you want to logout?</p>
                </div>
                <div className='flex gap-[1rem] w-full'>
                    <button className='flex justify-center items-center text-text text-[1rem] font-[600] leading-[1.5rem] w-full p-[1rem] rounded-md border border-primary-brand' onClick={()=>{props.onClose(false)}}>Cancel</button>
                    <PrimaryButton label="Log Out" action={()=>{props.onClose(false); navigate('/')}} />
                </div>
        </div>
    </div>
  )
}
