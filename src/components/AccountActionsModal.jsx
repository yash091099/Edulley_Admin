import React from "react";
import lock from '../assets/svg/lock.svg';
import logOut from '../assets/svg/log-out-grey.svg';
import { useNavigate } from "react-router-dom";
export default function AccountActionsModal(props) {
    const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0">
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-black/30"
        onClick={() => {
          props.onClose(false);
        }}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col gap-[1rem] bg-white w-[18.75rem] p-[2rem] rounded-[1rem]">
            <div className="cursor-pointer flex gap-[0.5rem] items-center py-[0.56rem]" onClick={()=>{props.onClose(false); navigate('/dashboard/profile-management')}}>
                <img src={lock} alt=""/>
                <p className="text-[#4B465C] text-[0.9375rem] font-[400] leading-[1.375rem]">Change Password</p>
            </div>
            <div className="flex gap-[0.5rem] items-center py-[0.56rem]" onClick={()=>{props.onClose(false);props.LogoutModal(true)}}>
                <img src={logOut} alt=""/>
                <p className="cursor-pointer text-[#4B465C] text-[0.9375rem] font-[400] leading-[1.375rem]" onClick={()=>{props.onClose(false);props.LogoutModal(true)}}>Log out</p>
            </div>
      </div>
    </div>
  );
}
