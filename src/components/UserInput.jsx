import React, { useRef, useState } from 'react';
import eye from '../assets/svg/hide-password.svg';
import editFile from '../assets/svg/edit.svg';

export default function UserInput({ label, type, placeholder, value, onChange }) {
  const fileRef = useRef(null);
  const [inputType, setInputType] = useState(type);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file.name);
    }
  };

  return (
    <div className='flex flex-col gap-[8px] w-full'>
      <label className='text-[1rem] font-[600] leading-[1.25rem]'>{label}</label>
      <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}>
        <input className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem] bg-transparent" 
               type={inputType} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
        {type === "file" && (
          <>
            <input ref={fileRef} className='hidden' type='file' onChange={handleFileChange} />
            <img className="cursor-pointer w-[1.5rem]" src={editFile} alt="file" onClick={() => fileRef.current.click()} />
          </>
        )}
        {type === "password" && (
          <img className="cursor-pointer w-[1.5rem]" src={eye} alt="eye" onClick={() => setInputType(prev => prev === 'password' ? 'text' : 'password')} />
        )}
      </div>
    </div>
  );
}