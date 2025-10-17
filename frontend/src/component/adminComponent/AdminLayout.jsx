import React from 'react'
import Navbar from '../comman/Navbar'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

function AdminLayout() {
    return (
             <div className=' px-5 flex md:gap-10 md:flex-row flex-col h-screen  bg-[#001434] text-white'>
            <aside className='md:w-[25%]  mt-10 md:overflow-y-scroll  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                <AdminSidebar />
            </aside>
            <main className='w-full overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                <Navbar />
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
