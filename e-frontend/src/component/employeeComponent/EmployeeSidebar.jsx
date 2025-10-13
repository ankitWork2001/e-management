import React, { useEffect, useState } from 'react'
import logo from '../../assets/sidebar_imgs/Logo.png'
import { FaHome } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { RiContactsBook2Fill } from "react-icons/ri";
import { RiUserShared2Fill } from "react-icons/ri";
import { IoDocument } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function EmployeeSidebar() {
  const location = useLocation()
  const [value, setValue] = useState("")
  const [sidebaropen, setSidebarOpen] = useState(false)
  useEffect(() => {
    const path = location.pathname
    if (path === '/employee') setValue('employee');
    else if (path === '/employee/hr_policies') setValue('policies');
    else if (path === '/employee/attendance') setValue('attendance');
    else if (path === '/employee/apply_leave') setValue('applyLeave');
    else if (path === '/employee/document_upload') setValue('documentUpload');
    else if (path === '/employee/profile_view') setValue('profileView');
    else if (path === '/employee/notification') setValue('notification');
    else setValue('');
  }, [location])
  console.log(value)
  const handleLogout = async() => {
   try {
    await API.post('admin/logout');
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
   } catch (error) {
    
   }
  }
  return (
    <div className='flex  md:flex-col gap-10 justify-between md:justify-center md:items-center'>
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <hr className="h-[2px] md:block hidden w-full border-0 bg-gradient-to-r from-[#001434] via-gray-300 to-[#001434]" />

      {/* Large screen */}
      <div className='md:flex hidden flex-col gap-2'>
        <NavLink
          to="/employee"
          end
          className={({ isActive }) =>
            `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
          }
        >
          <div className="flex items-center gap-5 px-4 py-3 rounded-2xl">
            <div className={`${value === 'employee' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'}  p-2 rounded-xl`}>
              <FaHome className={`${value === 'employee' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'}  w-[20px] h-[20px] bg-[#1A1F37]`} />
            </div>
            <p className="text-white font-semibold text-xl">Dashboard</p>
          </div>
        </NavLink>

        <NavLink to={'hr_policies'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'policies' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} p-2 rounded-xl`}>
              <RiShieldStarLine className={`${value === 'policies' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} w-[20px] h-[20px]  bg-[#1A1F37] `} />
            </div>
            <p className='text-white font-semibold text-xl'>HR Policies</p>
          </div>
        </NavLink>
        {/* <NavLink to={'attendance'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'attendance' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
              <RiContactsBook2Fill className={`${value === 'attendance' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px]`} />
            </div>
            <p className='text-white font-semibold text-xl'>Attendance</p>
          </div>
        </NavLink>*/}
        <NavLink to={'apply_leave'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'applyLeave' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
              <RiUserShared2Fill className={`${value === 'applyLeave' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
            </div>
            <p className='text-white font-semibold text-xl'>Apply Leave</p>
          </div>
        </NavLink>
        <NavLink to={'document_upload'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'documentUpload' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
              <IoDocument className={`${value === 'documentUpload' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
            </div>
            <p className='text-white font-semibold text-xl'>Document Upload</p>
          </div>
        </NavLink>
        <NavLink to={'profile_view'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'profileView' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
              <FaUser className={`${value === 'profileView' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
            </div>
            <p className='text-white font-semibold text-xl'>Profile View</p>
          </div>
        </NavLink>
        {/* 
        <NavLink to={'notification'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'notification' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
              <IoNotifications className={`${value === 'notification' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
            </div>
            <p className='text-white font-semibold text-xl'>Notifications</p>
          </div>
        </NavLink>*/}
        <button className='cursor-pointer  mt-10 hover:bg-gray-700 rounded-2xl transition-all duration-300'>

          <div className='flex items-center gap-5 px-4 py-3 rounded-2xl'>
            <div className='bg-[#1A1F37] p-2 rounded-xl'>
              <RiLogoutCircleLine className='text-[#0075FF] w-[20px] h-[20px]   ' />
            </div>
            <p className='text-white font-semibold text-xl'>Log Out</p>
          </div>
        </button>
      </div>

      {/* Small screen */}
      <div className='relative '>
        <div className='flex justify-end relative '>
          <IoMenu onClick={() => setSidebarOpen(true)} className={` ${sidebaropen ? 'hidden' : "block"} w-10  h-10 md:hidden block`} />
        </div>
        <AnimatePresence>
          {
            sidebaropen && (
              <motion.div initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.2, ease: 'easeInOut' }} className={` z-50 bg-black top-0  flex md:hidden fixed pl-3 right-0 h-full  flex-col gap-2`}>
                <div className='flex justify-end py-10 pr-5'>
                <RxCross2 onClick={() => setSidebarOpen(false)} className={`${sidebaropen ? 'block' : 'hidden'} w-10 h-10`} />
                </div>
                <NavLink
                  to="/employee"
                  end
                  className={({ isActive }) =>
                    `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }
                >
                  <div className="flex items-center gap-5 px-4 py-3 rounded-2xl">
                    <div className={`${value === 'employee' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'}  p-2 rounded-xl`}>
                      <FaHome className={`${value === 'employee' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'}  w-[20px] h-[20px] bg-[#1A1F37]`} />
                    </div>
                    <p className="text-white font-semibold text-xl">Dashboard</p>
                  </div>
                </NavLink>

                <NavLink to={'hr_policies'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'policies' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} p-2 rounded-xl`}>
                      <RiShieldStarLine className={`${value === 'policies' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} w-[20px] h-[20px]  bg-[#1A1F37] `} />
                    </div>
                    <p className='text-white font-semibold text-xl'>HR Policies</p>
                  </div>
                </NavLink>
                {/* 
                <NavLink to={'attendance'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'attendance' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
                      <RiContactsBook2Fill className={`${value === 'attendance' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px]`} />
                    </div>
                    <p className='text-white font-semibold text-xl'>Attendance</p>
                  </div>
                </NavLink>*/}
                <NavLink to={'apply_leave'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'applyLeave' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
                      <RiUserShared2Fill className={`${value === 'applyLeave' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
                    </div>
                    <p className='text-white font-semibold text-xl'>Apply Leave</p>
                  </div>
                </NavLink>
                <NavLink to={'document_upload'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'documentUpload' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
                      <IoDocument className={`${value === 'documentUpload' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
                    </div>
                    <p className='text-white font-semibold text-xl'>Document Upload</p>
                  </div>
                </NavLink>
                <NavLink to={'profile_view'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'profileView' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
                      <FaUser className={`${value === 'profileView' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
                    </div>
                    <p className='text-white font-semibold text-xl'>Profile View</p>
                  </div>
                </NavLink>
               {/* <NavLink to={'notification'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'notification' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
                      <IoNotifications className={`${value === 'notification' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
                    </div>
                    <p className='text-white font-semibold text-xl'>Notifications</p>
                  </div>
                </NavLink>*/} 
                <button className='cursor-pointer  mt-10 hover:bg-gray-700 rounded-2xl transition-all duration-300'>

                  <div className='flex items-center gap-5 px-4 py-3 rounded-2xl'>
                    <div className='bg-[#1A1F37] p-2 rounded-xl'>
                      <RiLogoutCircleLine className='text-[#0075FF] w-[20px] h-[20px]   ' />
                    </div>
                    <p className='text-white font-semibold text-xl' onClick={handleLogout}>Log Out</p>
                  </div>
                </button>

              </motion.div>
            )
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EmployeeSidebar

