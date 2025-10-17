import React, { useState, useEffect, useRef } from 'react'
import { FaUserClock } from 'react-icons/fa6'
import { LiaClipboardCheckSolid } from "react-icons/lia";
import { IoNotifications } from 'react-icons/io5'
import { MdOutlinePendingActions } from 'react-icons/md'
import icon1 from '../../assets/adminDashboard/icon1.png'
import icon2 from '../../assets/adminDashboard/icon2.png'
import icon3 from '../../assets/adminDashboard/icon3.png'
import icon4 from '../../assets/adminDashboard/icon4.png'
import { IoIosCheckmark } from 'react-icons/io';
import {motion} from 'framer-motion'
import API from '../../api/Api';
/*
const projects = [
    {
      name: "Chakra Soft UI Version",
      icon: icon1,
      projectLead: 'Ankit Sharma',
      dueDate: "11 May 2025",
      status:'Inprogress',
      completion: 60,
    },
    {
      name: "Add Progress Track",
      icon: icon2,
      projectLead: 'Devin Sharma',
      dueDate: "05 May 2025",
      status:'Pending',
      completion: 10,
    },
    {
      name: "Fix Platform Errors",
      icon: icon3,
      projectLead: 'Ankit Sharma',
      dueDate: "28 Apr 2025",
      status:'Completed',
      completion: 100,
    },
    {
      name: "Launch our Mobile App",
      icon: icon4,
      projectLead: 'Manali Odedara',
      dueDate: "15 Apr 2025",
      status:'Completed',
      completion: 100,
    },
    
  ];*/
function EmployeeDashboard() {
  const sectionRef = useRef(null)
  const [projects, setProjects] = useState([]);

  const userId = localStorage.getItem('employeeId');
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const { data } = await API.get(`/employee/tasks/${userId}`);
      setProjects(data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  fetchTasks();
}, [userId]);


  
const details = [
  {
    text: 'Profile Completeness',
    NoOfEmployee: 75,
    icon: LiaClipboardCheckSolid
  },
  {
    text: 'Training',
    NoOfEmployee: 58,
    icon: FaUserClock
  },
  {
    text: 'Leaves',
    NoOfEmployee: 10,
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
  return (
    <div>
      <div>
        <h1 className='text-xl font-bold'>Welcome, Hitesh Odedara</h1>
        <p className='text-[#A0AEC0] text-lg'>Here’s a quick overview of your information</p>
      </div>
{/*
      <section className='grid mt-8 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4  lg:pl-0'>
        {
          details.map((data, index) => (
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
      </section>*/}

      <section className='flex my-10 gap-10 items-center flex-col md:flex-row'>
        <div className='flex flex-col md:flex-row gap-5 py-5 items-center px-4 md:w-[50%] rounded-2xl bg-gradient-to-r from-[#060B28BD] to-[#0A0E23B5]'>
          <div className='flex justify-center'>
            <p className='text-xl text-red-500'>Circle ProgressBar</p>
          </div>
          <div>
            <h1 className='text-3xl mb-2 text-center md:text-start'>My Progress</h1>
            <p>Showcase a visual representation of the user's financial progress.</p>
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
              notification.map((data, index) => (
                <div key={index} className='flex gap-4'>
                  <img src={data.logo} alt="logo" className='w-5 h-5' />
                  <p>{data.text}</p>
                  <p className='text-[#A0AEC0]'>{data.time}</p>
                </div>
              ))
            }
          </div>

        </div>*/}
      </section>

       <section ref={sectionRef} className='my-10 bg-gradient-to-r from-[#060B28BD] to-[#0A0E23B5] px-10 pt-5 pb-10 rounded-xl'>
        <div className='space-y-5'>
          <h1 className='font-bold text-2xl'>Active Projects</h1>
          <div className='flex gap-2 items-center'>
            <div className='bg-green-500 w-5 h-5 rounded-full'>
              <IoIosCheckmark className='w-5 h-5' />
            </div>
            <span>3 done this Month</span>
          </div>
        </div>
        <div className='mt-5 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-lg text-gray-400">
                <th className="p-3">Project Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">assignedby</th>
                <th className="p-3">assignedto</th>

                <th className="p-3">status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr key={idx} className="border-b border-gray-700 ">
                  <td className="p-3 flex items-center gap-2"><img src={project.icon} alt="" /><span>{project.title}</span></td>
                  <td className="p-3">{project.description} </td>
                  <td className="p-3">{project.deadline}</td>
                  <td className="p-3">{project.assignedby}</td>
                  <td className="p-3">{project.assignedto}</td>

                  <td className="p-3">{project.status}</td>
                 {/* <td className="p-3">
                    <div className=' w-25 h-1 rounded-full bg-[#2D2E5F] '>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.status}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className="h-1 rounded-full bg-[#0075FF]"
                      />
                    </div>

                    <span className="text-sm text-gray-500">{project.assignedTo}%</span>
                  </td>*/} 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default EmployeeDashboard
