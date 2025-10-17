import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import profile from '../../assets/Navbar_imgs/profile.png'
import { AnimatePresence,motion } from 'framer-motion';
import { RxCross2 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';
function Navbar() {
  const [search,setSearch] = useState(false)
  const location = useLocation()
  const navHeading = location.pathname.split('/').filter(str => {if(str != '' && str != 'admin' && str != 'employee') return str}).toString().replace('_',' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  return (
    <div className='sticky -top-1 bg-[#001434]  py-3 px-2 rounded'>
     {/* For Large Screen */}
    <div className='md:flex hidden justify-between items-center h-16'>
      <h2 className='text-2xl font-bold'>{navHeading ? navHeading : 'Dashboard'}</h2>
      <div className='flex gap-2'>
        <div className='flex items-center gap-2 pl-4 rounded-3xl bg-gray-950'>
           <IoMdSearch className='text-gray-400'/>
           <input type="text" placeholder='Type here...' className='outline-none '/>
        </div>
        <div className='flex items-center gap-5'>
          <IoSettingsSharp className='w-5 h-5 cursor-pointer text-[#0075FF]'/>
          <IoNotifications className='w-5 h-5 cursor-pointer text-[#0075FF]'/>
          <img src={profile} alt="Profile" className='w-8 cursor-pointer'/>
        </div>
      </div>
    </div>
    
    {/* For Small Screen */}
    <div className='flex md:hidden justify-between items-center py-5'>
      <h2 className={`${search ? 'hidden' : 'block'} font-semibold text-xl`}>{navHeading ? navHeading : 'Dashboard'}</h2>
      <div className={`${search ? 'w-full justify-center' : 'none'} flex gap-2 items-center `}>
        <IoMdSearch onClick={() => setSearch(true)} className={`${search ? 'hidden' : 'block'} text-[#0075FF] w-6 h-6`} />
        <AnimatePresence>
          {search &&
            <motion.div initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }} className={`flex w-[50%] items-center gap-2 rounded-3xl bg-gray-950 pl-4`}>
              <IoMdSearch className='text-gray-400 w-6 h-6 ml-' />
              <input type="text" placeholder='Type here...' className='outline-none w-full h-10' />
            </motion.div>
          }
        </AnimatePresence>
        <RxCross2 onClick={() => setSearch(false)} className={`${search ? 'block' : 'hidden'} w-5 h-5`} />
        <div className='flex items-center gap-5'>
          <IoSettingsSharp className='w-5 h-5 cursor-pointer text-[#0075FF]' />
          <IoNotifications className='w-5 h-5 cursor-pointer text-[#0075FF]' />
          <img src={profile} alt="Profile" className='w-8 cursor-pointer' />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar
