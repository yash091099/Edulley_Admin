import React from 'react'
import editFile from '../assets/svg/edit.svg';
import fileUpload from '../assets/svg/file-upload.svg';
import { useState } from 'react';
import { useRef } from 'react';
export default function UserTextArea(props) {
    const fileRef = useRef(null);
    const [file, setFile] = useState('file1.png');

  return (
    <div className='flex flex-col gap-[8px] w-full'>
        <label className='text-[1rem] font-[600] leading-[1.25rem]'>{props.label}</label>
        <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}>
            <div  className="w-full outline-none text-[0.75rem] text-[#656565] font-[400]">
              <p>{props.text}</p>
              <p>{props.allowdFormats}</p>
            </div>
            <input ref={fileRef} className='hidden' type='file' onChange={(e)=>setFile(e.target.value)} />
            <img className="cursor-pointer w-[1.5rem]" src={fileUpload} alt="file" onClick={()=>{fileRef.current.click()}}/>
        </div>
    </div>
  )
}
