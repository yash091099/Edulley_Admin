import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import SuccessModal from '../components/SuccessModal'
import AccountActionsModal from '../components/AccountActionsModal'
import LogoutModal from '../components/LogoutModal'

export default function Dashboard() {
  const [logout, setLogout] = useState(false);
  const [accountAction, setAccountAction] = useState(false);
  return (
      <div className='flex bg-[#DBDADE]'>
        <div className='flex w-fit'>
          <Sidebar />
        </div>
        <div className='flex flex-col gap-[1.5rem] w-full px-[2rem] py-[1rem]'>
          <Navbar profileClick={()=>{setAccountAction(true)}} />
          <Outlet />
          <p className='text-[#4B465C] text-[0.9375rem] font-[400] leading-[1.375rem] mx-auto mb-[1rem]'>Copyright 2023 - Company Name. All rights reserved.</p>
        </div>
        {/* <SuccessModal /> */}
        {accountAction && <AccountActionsModal onClose={setAccountAction} LogoutModal={setLogout}/>}
        {logout && <LogoutModal onClose={setLogout} />}
      </div>
  )
}
