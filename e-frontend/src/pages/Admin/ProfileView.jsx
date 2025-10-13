import React, { useEffect,useState } from 'react'
import profile_image from '../../assets/profile_photo.png'
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import API from '../../api/Api';
function ProfileView() {
  const [edit,setEdit] = useState(false)
  const [data,setData] = useState([])

  const getData = (e) => {
     const name = e.target.name;
     const value = e.target.value;
     setData(pre => ({
      ...pre,
      [name]:value
     }))
  }

  const storedProfile = JSON.parse(localStorage.getItem("user"));
  //console.log(storedProfile.id ? storedProfile.id : 1);
  //const employeeId =  storedProfile.id;
  const employeeId = 1;
  useEffect(() => {
    const data = API.get(`admin/employee/${employeeId}`);
    setData(data);
  }, []);
  useEffect(()=>{
    const updateData = async () => {
      const response = await API.put(`admin/employee//${employeeId}`, data);
      setData(response);
    };
    if (edit) {
      updateData();
    }
  }, [edit]);
  const saveData = (e) => {
     e.preventDefault()
     setEdit(false)
  }
  return (
    <div className='flex justify-center items-center md:my-10 mt-15'>
      <div className='flex flex-col gap-5 items-center'>
        <h2 className='text-2xl'>Personal Info</h2>
        <div className='bg-black px-10 py-10 rounded-3xl '>
          <div className='flex gap-7'>
            <img src={data.profile_photo} alt="image" />
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <label htmlFor="name" className='text-xl'>Name</label>
                {edit ? <ImCross onClick={() => setEdit(false)} className='cursor-pointer text-[#0075FF] '/> :<FaEdit onClick={() => setEdit(true)} className='text-xl text-[#0075FF] rounded-lg cursor-pointer'/>}
              </div>
              <input type="text" readOnly={!edit} className="p-1 bg-gray-800 text-[#A0AEC0]  read-only:outline-gray-500 rounded pl-4 read-only:outline-1 read-only:cursor-not-allowed read-only:rounded"  id='name' name='name' value={data.name} onChange={getData}/>
            </div>
          </div>
          <form onSubmit={saveData} className='mt-5 space-y-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="email" className='text-xl'>Email</label>
              <input type="text" name='email' value={data.email} onChange={getData} readOnly={!edit} className="p-1 bg-gray-800 rounded pl-4 text-[#A0AEC0]  read-only:outline-gray-500 read-only:outline-1 read-only:rounded read-only:cursor-not-allowed" />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="phone" className='text-xl'>Phone</label>
              <input type="number" name='phone' value={data.phone} onChange={getData} readOnly={!edit} className="p-1 bg-gray-800 rounded pl-4 text-[#A0AEC0]  read-only:outline-gray-500 read-only:outline-1 read-only:rounded read-only:cursor-not-allowed" />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="address" className='text-xl'>Address</label>
              <input type="text" name='address' value={data.address} onChange={getData} readOnly={!edit} className="p-1 bg-gray-800 rounded pl-4 text-[#A0AEC0]  read-only:outline-gray-500 read-only:outline-1 read-only:rounded read-only:cursor-not-allowed" />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="position" className='text-xl'>Position</label>
              <input type="text" name='position' value={data.position} onChange={getData} readOnly={!edit} className="p-1 bg-gray-800 rounded pl-4 text-[#A0AEC0]  read-only:outline-gray-500 read-only:outline-1 read-only:rounded read-only:cursor-not-allowed" />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="employee_type" className='text-xl'>Employee Type</label>
              <input type="text" name='employee_type' value={data.employee_type} onChange={getData}  readOnly={!edit} className="p-1 bg-gray-800 rounded pl-4 text-[#A0AEC0]  read-only:outline-gray-500 read-only:outline-1 read-only:rounded read-only:cursor-not-allowed" />
            </div>
            <button className={`${edit ? 'block' : 'hidden'} outline-none cursor-pointer bg-[#0075FF] hover:bg-blue-600 transition-bg duration-300 w-full text-xl py-2 rounded mt-3`}>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileView