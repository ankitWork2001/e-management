import React, { useState,useEffect, useRef } from 'react'
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaUserClock } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { motion, useInView } from 'framer-motion'
import { IoIosCheckmark } from "react-icons/io";
import icon1 from '../../assets/adminDashboard/icon1.png'
import icon2 from '../../assets/adminDashboard/icon2.png'
import icon3 from '../../assets/adminDashboard/icon3.png'
import icon4 from '../../assets/adminDashboard/icon4.png'
import icon5 from '../../assets/adminDashboard/icon5.png'
import icon6 from '../../assets/adminDashboard/icon6.png'
import icon7 from '../../assets/adminDashboard/icon7.png'
import icon8 from '../../assets/adminDashboard/icon8.png'

function AdminDashboard() {
  const sectionRef = useRef(null)
  const isIsView = useInView(sectionRef, { once: true })
  const totalEmployee = 150;
  const currentEmployee = 120;
  const activeEmployee = 100;
  const percent = (currentEmployee / totalEmployee) * 100;
  const activeEmployeePercent = (activeEmployee / totalEmployee) * 100
  const [projects, setProjects] = useState([]);

  const details = [
    {
      text: 'Employee',
      NoOfEmployee: 120,
      icon: HiOutlineUserCircle
    },
    {
      text: 'Active Employee',
      NoOfEmployee: 100,
      icon: FaUserClock
    },
    {
      text: 'Pending Leaves',
      NoOfEmployee: 5,
      icon: MdOutlinePendingActions
    },
    {
      text: 'Notifications',
      NoOfEmployee: 9,
      icon: IoNotifications
    },
  ]
  const notification = [
    {
      text: 'New order #9851258',
      time: '18 DEC 4:41 PM',
      logo: icon1
    },
    {
      text: '$2400, Design changes',
      time: '22 DEC 7:20 PM',
      logo: icon2
    },
    {
      text: 'New order #4219423',
      time: '21 DEC 11:21 PM',
      logo: icon3
    },
  ]
/*
  const projects = [
    {
      name: "Chakra Soft UI Version",
      icon: icon1,
      members: 5,
      budget: "$14,000",
      completion: 60,
    },
    {
      name: "Add Progress Track",
      icon: icon4,
      members: 2,
      budget: "$3,000",
      completion: 10,
    },
    {
      name: "Fix Platform Errors",
      icon: icon5,
      members: 1,
      budget: "Not Sent",
      completion: 100,
    },
    {
      name: "Launch our Mobile App",
      icon: icon6,
      members: 5,
      budget: "$32,000",
      completion: 100,
    },
    {
      name: "Add the New Pricing Page",
      icon: icon7,
      members: 5,
      budget: "$400",
      completion: 25,
    },
    {
      name: "Redesign New Online Shop",
      icon: icon8,
      members: 1,
      budget: "$7,600",
      completion: 40,
    },
  ];*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get('/admin/task/all-tasks');
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);





  return (
    <div>
      {/** 
      <section className='grid  grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4  lg:pl-0'>
        {
          details.map((data,index) => (
            <div key={index} className='flex justify-between items-center  bg-gradient-to-r from-[#4E6185] px-7 py-1 to-[#1A1F3780] rounded-xl'>
              <div >
                <p className='text-[12px] text-[#A0AEC0] font-semibold '>{data.text}</p>
                <p className='text-2xl font-semibold'>{data.NoOfEmployee}</p>
              </div>
              <div className='bg-[#0075FF] flex items-center justify-center px-1 w-[37px] h-[37px] rounded-2xl'>
                <data.icon className='w-6 h-6' />
              </div>
            </div>
          ))
        }
      </section>

      <section className='mt-13 flex gap-10 md:gap-0 md:justify-around  items-center md:items-start  lg:flex-row flex-col'>
        <div className='bg-gradient-to-r from-[#060B28BD] to-[#0A0E23B5] md:px-10 px-4 pt-5 pb-10 rounded-xl'>
          {/* Chart /}
          <div className='text-3xl mb-8'>Chart</div>

          <div className='flex flex-col '>
            <div className='flex gap-4'>
              <h1 className='text-xl font-semibold'>Active Employee</h1>
              <select className='bg-[#0075FF] rounded-md text-sm outline-none'>
                <option value="year">This Year</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className='flex mt-7 gap-15'>
              <div className='flex gap-3'>
                <div className='bg-[#0075FF] flex items-center justify-center px-1 w-[30px] h-[30px] rounded-lg'>
                  <HiOutlineUserCircle className='w-6 h-6' />
                </div>
                <div className='space-y-3'>
                  <p className='text-xl font-semibold text-[#A0AEC0]'>Employee</p>
                  <p className='text-3xl font-semibold'>120</p>
                  <div className=' w-25 h-1 rounded-full bg-[#2D2E5F] '>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1 }} className={`h-1 rounded-full  bg-[#0075FF]`} style={{ width: `${percent}%` }} />
                  </div>
                </div>
              </div>
              <div className='flex gap-3'>
                <div className='bg-[#0075FF] flex items-center justify-center px-1 w-[30px] h-[30px] rounded-lg'>
                  <FaUserClock className='w-6 h-6' />
                </div>
                <div className='space-y-3'>
                  <p className='text-xl font-semibold text-[#A0AEC0]'>Active</p>
                  <p className='text-3xl font-semibold'>100</p>
                  <div className=' w-25 h-1 rounded-full bg-[#2D2E5F] '>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1 }} className={`h-1 rounded-full  bg-[#0075FF]`} style={{ width: `${percent}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
{/* 
        <div className='space-y-3 bg-gradient-to-r from-[#060B28BD] to-[#0A0E23B5] px-10 pt-5 pb-10 rounded-xl'>
          <h1 className='text-2xl font-bold'>Notification</h1>
          <div className='flex gap-3'>
            <div className='bg-green-500 w-5 h-5 rounded-full'>
              <IoIosCheckmark className='w-5 h-5' />
            </div>
            <span className='text-[#A0AEC0] text-sm font-semibold'>This Month</span>
          </div>
          <div className='space-y-5'>
            {
              notification.map((data,index) => (
                <div key={index} className='flex gap-4'>
                  <img src={data.logo} alt="logo" className='w-5 h-5' />
                  <p>{data.text}</p>
                  <p className='text-[#A0AEC0]'>{data.time}</p>
                </div>
              ))
            }
          </div>

        </div>}
      </section>*/}

      <section ref={sectionRef} className='my-15 bg-gradient-to-r from-[#060B28BD] to-[#0A0E23B5] px-10 pt-5 pb-10 rounded-xl'>
        <div className='space-y-5'>
          <h1 className='font-bold text-2xl'>Projects</h1>
          <div className='flex gap-2 items-center'>
            <div className='bg-green-500 w-5 h-5 rounded-full'>
              <IoIosCheckmark className='w-5 h-5' />
            </div>
            <span>30 done this Month</span>
          </div>
        </div>
        <div className='mt-5 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-lg text-gray-400">
                <th className="p-3">Companies</th>
                <th className="p-3">Members</th>
                <th className="p-3">Budget</th>
                <th className="p-3">Completion</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr key={idx} className="border-b border-gray-700 ">
                  <td className="p-3 flex items-center gap-2"><img src={project.icon} alt="" /><span>{project.name}</span></td>
                  <td className="p-3">{project.members} avatars</td>
                  <td className="p-3">{project.budget}</td>
                  <td className="p-3">
                    <div className=' w-25 h-1 rounded-full bg-[#2D2E5F] '>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.completion}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className="h-1 rounded-full bg-[#0075FF]"
                      />
                    </div>

                    <span className="text-sm text-gray-500">{project.completion}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
