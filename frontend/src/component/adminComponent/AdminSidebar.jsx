import React, { useEffect, useState } from 'react'
import logo from '../../assets/sidebar_imgs/Logo.png'
import { FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { RiContactsBook2Fill } from "react-icons/ri";
import { RiUserShared2Fill } from "react-icons/ri";
import { IoDocument } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion'
import API from '../../api/API';

function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState("")
  const [sidebaropen, setSidebarOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  useEffect(() => {
    const path = location.pathname
    if (path === '/admin/dashboard') setValue('admin');
    else if (path === '/admin/add_employee') setValue('add_employee');
    else if (path === '/admin/employee_directory') setValue('employee_directory');
    else if (path === '/admin/leave_requests') setValue('leave_requests');
    else if (path === '/admin/document_tracker') setValue('document_tracker');
    else if (path === '/admin/profile_view') setValue('profile_view');
    else setValue('');
  }, [location])

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } finally {
      setShowLogoutModal(false);
      setSidebarOpen(false);
    }
  }

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  }

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
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
        <button 
          onClick={openLogoutModal}
          className='cursor-pointer mt-10 hover:bg-gray-700 rounded-2xl transition-all duration-300'
        >
          <div className='flex items-center gap-5 px-4 py-3 rounded-2xl'>
            <div className='bg-[#1A1F37] p-2 rounded-xl'>
              <RiLogoutCircleLine className='text-[#0075FF] w-[20px] h-[20px]' />
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
                <button 
                  onClick={openLogoutModal}
                  className='cursor-pointer mt-10 hover:bg-gray-700 rounded-2xl transition-all duration-300'
                >
                  <div className='flex items-center gap-5 px-4 py-3 rounded-2xl'>
                    <div className='bg-[#1A1F37] p-2 rounded-xl'>
                      <RiLogoutCircleLine className='text-[#0075FF] w-[20px] h-[20px]' />
                    </div>
                    <p className='text-white font-semibold text-xl'>Log Out</p>
                  </div>
                </button>
              </motion.div>
            )
          }
        </AnimatePresence>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Confirm Logout</h3>
                <button
                  onClick={closeLogoutModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <RxCross2 size={24} />
                </button>
              </div>
              
              <p className="text-gray-300 mb-6">
                Are you sure you want to logout? You'll need to login again to access your account.
              </p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={closeLogoutModal}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <RiLogoutCircleLine />
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminSidebar