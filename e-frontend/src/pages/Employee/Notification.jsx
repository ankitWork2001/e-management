import React, { useState } from 'react'
import { MdOutlineCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdMoreHoriz } from "react-icons/md";
import notification_img from '../../assets/notification_imgs/notification.png'

const notificatins = [
  {
    id:1,
    status:'Approve',
    message:'Your Leave Request has been Approve'
  },
  {
    id:2,
    status:'Rejected',
    message:'Your Document is Rejected'
  },
  {
    id:3,
    status:'Pending',
    message:'Your Profile is Pending'
  },
]

function Notification() {
  const [showNotifications,setShowNotifications] = useState(notificatins)

  const deleteNotification = (id) => {
     const filterNotification = showNotifications.filter(notification => notification.id != id)
     setShowNotifications(filterNotification)
  }
  return (
    <div className='flex flex-col gap-8 mt-10 pl-2'>
      {
        showNotifications.length != 0 ? showNotifications.map(notification => (
          <div key={notification.id} className='relative flex justify-between z-10 items-center md:w-[60%]  bg-black py-4 px-4 rounded-lg'>
            <div className={`${notification.status === 'Approve' ? 'bg-green-500' : notification.status === 'Rejected' ? 'bg-red-600' : 'bg-yellow-600'} absolute w-2 py-8 -left-2 z-0 rounded-l-full`}></div>
            <div className='flex gap-6'>
             {notification.status === 'Approve' ? <div><MdOutlineCheck className='w-7 h-7 px-1 py-1 text-black bg-green-600 rounded-full'/></div> : notification.status === 'Rejected' ? <div><RxCross2 className='w-7 h-7 px-1 py-1 text-black bg-red-600 rounded-full'/></div> : <div className=''><MdMoreHoriz className='w-7 h-7 px-1 py-1 bg-yellow-600 text-black rounded-full'/></div>}
             <p className='text-xl text-[#A0AEC0]'>{notification.message}</p>
            </div>
             <RxCross2 onClick={() => deleteNotification(notification.id)} className='text-xl text-[#A0AEC0] cursor-pointer'/>
          </div>
        ))
        :
        <div className='md:w-[55%] mx-auto'>
        <img src={notification_img} alt="No Notifications" />
        </div>
      }
    </div>
  )
}

export default Notification
