import React, { useEffect, useState } from 'react'
import API from '../../api/Api'
const attendanceData = [
  {
    date: "28-01-2025",
    checkIn: "09:00",
    checkOut: "18:00",
    workHour: "10h",
    status: "Present"
  },
  {
    date: "27-01-2025",
    checkIn: "10:30",
    checkOut: "18:00",
    workHour: "8h 30m",
    status: "Late"
  },
  {
    date: "26-01-2025",
    checkIn: "00:00",
    checkOut: "00:00",
    workHour: "0m",
    status: "Absent"
  },
  {
    date: "25-01-2025",
    checkIn: "09:00",
    checkOut: "18:00",
    workHour: "10h",
    status: "Present"
  },
  {
    date: "24-01-2025",
    checkIn: "09:00",
    checkOut: "18:00",
    workHour: "10h",
    status: "Present"
  },
  {
    date: "23-01-2025",
    checkIn: "09:00",
    checkOut: "18:00",
    workHour: "10h",
    status: "Present"
  },
  {
    date: "23-01-2025",
    checkIn: "09:00",
    checkOut: "18:00",
    workHour: "10h",
    status: "Present"
  },
  {
    date: "23-01-2025",
    checkIn: "09:00",
    checkOut: "18:00",
    workHour: "10h",
    status: "Present"
  },
  {
    date: "23-01-2025",
    checkIn: "09:00",
    checkOut: "18:00",
    workHour: "10h",
    status: "Present"
  },
  {
    date: "23-01-2025",
    checkIn: "09:00",
    checkOut: "18:00",
    workHour: "10h",
    status: "Present"
  },
  {
    date: "25-01-2025",
    checkIn: "09:00",
    checkOut: "18:00",
    workHour: "10h",
    status: "Present"
  },
];

function Attendance() {
  const[attendanceData, setAttendanceData] = useState([])
  const [showData,setShowData] = useState('All')
  const [tableData,setTableData] = useState(attendanceData)
  const employeeId = localStorage.getItem('employeeId');
  useEffect(() => {
    const data=API.get(`/employee/attendance-report/:${employeeId}`);
    setAttendanceData(data);
  },[])

  useEffect(() => {
     const filterData = attendanceData.filter(data => data.status === showData)
     setTableData(showData === 'All' ? attendanceData : filterData)
  },[showData])
  return (
    <div className='mt-7 mb-10'>
      <div className='flex md:justify-between flex-col md:flex-row items-center gap-5 mt-5'>
        <h1 className='text-2xl'>Attendance Overview</h1>
        <div className='flex gap-5 md:pr-15 '>
          <div className='text-[#A0AEC0] text-xl flex gap-1 items-center'>
            <input type="radio" onChange={() => setShowData('All')} id='all' name='options' className='outline-none'/>
            <label htmlFor="all"  className='cursor-pointer'>All</label>
          </div>
          <div className='text-[#A0AEC0] text-xl flex gap-1 items-center'>
            <input type="radio" id='present' onChange={() => setShowData('Present')} name='options' className='outline-none'/>
            <label htmlFor="present"  className='cursor-pointer'>Present</label>
          </div>
          <div className='text-[#A0AEC0] text-xl flex gap-1 items-center'>
            <input type="radio" id='halfDay' onChange={() => setShowData('Late')} name='options' className='outline-none'/>
            <label htmlFor="halfDay" className='cursor-pointer w-19'>Half Day</label>
          </div>
          <div className='text-[#A0AEC0] text-xl flex gap-1 items-center'>
            <input type="radio" id='abscent' onChange={() => setShowData('Absent')} name='options' className='outline-none'/>
            <label htmlFor="abscent" className='cursor-pointer'>Abscent</label>
          </div>
        </div>
      </div>

      <div className='mt-10 scrollbar h-[57vh] overflow-y-scroll'>
        <table className='md:w-[90%] text-left'>
          <thead className='bg-[#050E28]'>
            <tr>

              <th className='text-lg font-semibold py-3 md:px-3 px-8'>Date</th>
            {/*   //<th className='text-lg font-semibold py-3 md:px-3 px-8'>Check-in</th>
             // <th className='text-lg font-semibold py-3 md:px-3 px-8'>Check-out</th>
              //<th className='text-lg font-semibold py-3 md:px-3 px-8'>Work-Hour</th>*/}
              <th className='text-lg font-semibold py-3 md:px-3 px-8'>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              tableData.map((data,index) => (
                <tr key={index} className='border-b'>
                  <td className='py-4 md:px-3 px-5'>{data.date}</td>
                 {/* <td className='py-4 md:px-3 px-5'><span className={`${data.status === 'Absent' ? 'text-red-500' : 'text-[#0075FF]'}`}>{data.checkIn}</span></td>
                  <td className='py-4 md:px-3 px-5'><span className={`${data.status === 'Absent' ? 'text-red-500' : 'text-[#0075FF]'}`}>{data.checkOut}</span></td>
                  <td className='py-4 md:px-3 px-5'><span className={`${data.status === 'Absent' ? 'text-red-500' : 'none'}`}>{data.workHour}</span></td>*/} 
                  <td className='py-4 md:px-3 px-5 '><span className= {`${data.status === 'Present' ? 'bg-green-200 text-green-700': data.status === 'Late' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-700'} px-3 rounded`}>{data.status}</span></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance
