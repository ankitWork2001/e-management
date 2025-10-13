import React, { useEffect, useState } from 'react'
import logo from '../../assets/sidebar_imgs/Logo.png'
import { FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { RiContactsBook2Fill } from "react-icons/ri";
import { RiUserShared2Fill } from "react-icons/ri";
import { IoDocument } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { NavLink, useLocation } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion'

function AdminSidebar() {
  const location = useLocation()
  const [value, setValue] = useState("")
  const [sidebaropen, setSidebarOpen] = useState(false)
  useEffect(() => {
    const path = location.pathname
    if (path === '/admin') setValue('admin');
    else if (path === '/admin/add_employee') setValue('add_employee');
    else if (path === '/admin/employee_directory') setValue('employee_directory');
    else if (path === '/admin/leave_requests') setValue('leave_requests');
    else if (path === '/admin/document_tracker') setValue('document_tracker');
    else if (path === '/admin/profile_view') setValue('profile_view');
    else setValue('');
  }, [location])

  const handleLogout = async() => {
   try {
    await API.post('admin/logout');
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
   } catch (error) {
    
   }
  }

  return (
    <div className='flex md:flex-col gap-10 justify-between md:justify-center md:items-center'>
      <div className=''>
        <img src={logo} alt="Logo" />
      </div>
      <hr className="h-[2px] w-full md:block hidden border-0 bg-gradient-to-r from-[#001434] via-gray-300 to-[#001434]" />

      {/* Large screen */}
      <div className='md:flex hidden flex-col gap-2'>
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
          }
        >
          <div className="flex items-center gap-5 px-4 py-3 rounded-2xl">
            <div className={`${value === 'admin' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'}  p-2 rounded-xl`}>
              <FaHome className={`${value === 'admin' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'}  w-[20px] h-[20px] bg-[#1A1F37]`} />
            </div>
            <p className="text-white font-semibold text-xl">Dashboard</p>
          </div>
        </NavLink>

        <NavLink to={'add_employee'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'add_employee' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} p-2 rounded-xl`}>
              <IoMdAddCircle className={`${value === 'add_employee' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} w-[20px] h-[20px]  bg-[#1A1F37] `} />
            </div>
            <p className='text-white font-semibold text-xl'>Add Employee</p>
          </div>
        </NavLink>
        <NavLink to={'employee_directory'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'employee_directory' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
              <RiContactsBook2Fill className={`${value === 'employee_directory' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px]`} />
            </div>
            <p className='text-white font-semibold text-xl'>Employee Directory</p>
          </div>
        </NavLink>
        <NavLink to={'leave_requests'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'leave_requests' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
              <RiUserShared2Fill className={`${value === 'leave_requests' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
            </div>
            <p className='text-white font-semibold text-xl'>Leave Requests</p>
          </div>
        </NavLink>
        <NavLink to={'document_tracker'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'document_tracker' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
              <IoDocument className={`${value === 'document_tracker' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
            </div>
            <p className='text-white font-semibold text-xl'>Document Tracker</p>
          </div>
        </NavLink>
        <NavLink to={'profile_view'} className={({ isActive }) =>
          `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
        }>
          <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
            <div className={`${value === 'profile_view' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
              <FaUser className={`${value === 'profile_view' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
            </div>
            <p className='text-white font-semibold text-xl'>Profile View</p>
          </div>
        </NavLink>
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
        <div className='flex justify-end '>
          <IoMenu onClick={() => setSidebarOpen(true)} className={` ${sidebaropen ? 'hidden' : "block"} w-10 h-10 md:hidden block`} />
        </div>

        <AnimatePresence>
          {
            sidebaropen && (
              <motion.div initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.2, ease: 'easeInOut' }} className={` z-50 pl-5 flex md:hidden bg-gray-900 fixed top-0 right-0 h-full  flex-col gap-2`}>
                <div className='flex justify-end pt-10 mr-5 mb-10'>
                  <RxCross2 onClick={() => setSidebarOpen(false)} className={`${sidebaropen ? 'block' : 'hidden'} w-10 h-10`} />
                </div>
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                  }
                >
                  <div className="flex items-center gap-5 px-4 py-3 rounded-2xl">
                    <div className={`${value === 'admin' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'}  p-2 rounded-xl`}>
                      <FaHome className={`${value === 'admin' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'}  w-[20px] h-[20px] bg-[#1A1F37]`} />
                    </div>
                    <p className="text-white font-semibold text-xl">Dashboard</p>
                  </div>
                </NavLink>

                <NavLink to={'add_employee'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'add_employee' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} p-2 rounded-xl`}>
                      <IoMdAddCircle className={`${value === 'add_employee' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} w-[20px] h-[20px]  bg-[#1A1F37] `} />
                    </div>
                    <p className='text-white font-semibold text-xl'>Add Employee</p>
                  </div>
                </NavLink>
                <NavLink to={'employee_directory'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'employee_directory' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
                      <RiContactsBook2Fill className={`${value === 'employee_directory' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px]`} />
                    </div>
                    <p className='text-white font-semibold text-xl'>Employee Directory</p>
                  </div>
                </NavLink>
                <NavLink to={'leave_requests'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'leave_requests' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
                      <RiUserShared2Fill className={`${value === 'leave_requests' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
                    </div>
                    <p className='text-white font-semibold text-xl'>Leave Requests</p>
                  </div>
                </NavLink>
                <NavLink to={'document_tracker'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'document_tracker' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
                      <IoDocument className={`${value === 'document_tracker' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
                    </div>
                    <p className='text-white font-semibold text-xl'>Document Tracker</p>
                  </div>
                </NavLink>
                <NavLink to={'profile_view'} className={({ isActive }) =>
                  `${isActive ? 'bg-gray-800 rounded-2xl' : 'bg-none'}`
                }>
                  <div className='flex items-center gap-5  px-4 py-3 rounded-2xl'>
                    <div className={`${value === 'profile_view' ? 'bg-[#0075FF]' : 'bg-[#1A1F37]'} bg-[#1A1F37] p-2 rounded-xl`}>
                      <FaUser className={`${value === 'profile_view' ? 'text-white bg-[#0075FF]' : 'text-[#0075FF]'} text-[#0075FF] w-[20px] h-[20px] `} />
                    </div>
                    <p className='text-white font-semibold text-xl'>Profile View</p>
                  </div>
                </NavLink>
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

export default AdminSidebar

