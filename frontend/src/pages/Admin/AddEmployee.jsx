import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import API from '../../api/Api';

function AddEmployee() {
  const [data, setData] = useState({
    firstname: '',
    email: '',
    phoneNumber: '',
    position: '',
    joiningDate: '',
    employeeId: '',
    salary: ''
  });

  const postdata = async () => {
    try {
      const res = await API.post('/employees', data);
      console.log("Employee saved:", res.data);
    } catch (error) {
      console.error("Error while saving employee:", error.response?.data || error.message);
    }
  };

  const getData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", data);

    await postdata();

    // reset fields after posting
    setData({
      firstname: '',
      email: '',
      phoneNumber: '',
      position: '',
      joiningDate: '',
      employeeId: '',
      salary: ''
    });
  };

  return (
    <div>
      <form className='mt-15 px-5' onSubmit={submit}>
        <div className='grid md:grid-cols-1 grid-cols-1 md:gap-5 gap-10'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="firstname">First Name</label>
            <input type="text" name='firstname' value={data.firstname} onChange={getData} required id='firstname' placeholder='First Name' className='md:w-[80%] w-full px-4 py-2 bg-[#050E28] rounded-md text-lg' />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-lg'>Email Address</label>
            <input type="email" name='email' value={data.email} onChange={getData} required id='email' placeholder='Enter Email Address' className='md:w-[80%] w-full px-4 py-2 bg-[#050E28] rounded-md text-lg' />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="phone" className='text-lg'>Phone No.</label>
            <input type="tel" name='phoneNumber' value={data.phoneNumber} onChange={getData} required id='phone' placeholder='Enter Phone Number' className='md:w-[80%] w-full px-4 py-2 bg-[#050E28] rounded-md text-lg' />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="position" className='text-lg'>Position</label>
          <input type="text" name='position' value={data.position} onChange={getData} required id='position' placeholder='Enter Job Position' className='md:w-[80%] w-full px-4 py-2 bg-[#050E28] rounded-md text-lg' />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="joining_date" className='text-lg'>Joining Date</label>
          <input type="date" name='joiningDate' value={data.joiningDate} onChange={getData} required id='joining_date' className='md:w-[80%] w-full px-1 py-2 bg-[#050E28] rounded-md text-white' />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="employee_id" className='text-lg'>Employee Id</label>
          <input type="text" name='employeeId' value={data.employeeId} onChange={getData} required id='employee_id' placeholder='Enter Employee ID' className='md:w-[80%] w-full px-1 py-2 bg-[#050E28] rounded-md text-lg' />
        </div>

        <div className='flex flex-col gap-2 mt-2'>
          <label htmlFor="salary" className='text-lg'>Salary</label>
          <input type="number" name='salary' value={data.salary} onChange={getData} required id='salary' placeholder='Enter Salary' className='md:w-[80%] w-full px-4 py-2 bg-[#050E28] rounded-md text-lg' />
        </div>

        <button className='text-lg bg-[#0075FF] md:w-[80%] w-80 py-2 mb-20 mt-5 cursor-pointer hover:bg-blue-600 transition-all duration-300 rounded-md'>Save</button>
      </form>
    </div>
  );
}

export default AddEmployee;




/*import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import API from '../../api/Api';
import axios from 'axios';
function AddEmployee() {
  const [data,setData] = useState({
    firstname:'',
    //lastname:'',
    email:'',
    phoneNumber:'',
    position:'',
    joiningDate:'',
    employeeId:'',
    salary:''
   // employeeIdProof:''
  })
  //const [fileName, setFileName] = useState('')

const postdata=async()=>{
try {
  const res=await API.post('/employees',data)
  console.log(res)
} catch (error) {
  console.log(error)
}
}


  function getData(e){
      const name = e.target.name
      const value = e.target.value

      setData(pre => ({...pre,[name] : value}))
  }

/*
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
      setData(pre => ({...pre,employeeIdProof : file}))
    } else {
      setFileName('')
    }
  }
  const submit = async(e) => {
    e.preventDefault()
    console.log(data)
    
    setData({
    firstname:'',
    //lastname:'',
    email:'',
    phoneNumber:'',
    jobRol:'',
    joiningDate:'',
    employeeId:'',
    salary:''
   // employeeIdProof:''
  })
  await postdata()
  }

  return (
    <div>
      <form className='mt-15 px-5' onSubmit={submit}>
        <div className='grid md:grid-cols-1 grid-cols-1 md:gap-5 gap-10'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="firstname">First Name</label>
            <input type="text" name='firstname' value={data.firstname} onChange={getData} required id='firstname' placeholder='First Name' className='md:w-[80%] w-full px-4 py-2  bg-[#050E28] rounded-md text-lg' />
          </div>
          {
          <div className='flex flex-col gap-2'>
            <label htmlFor="lastname" className='text-lg'>Last Name</label>
            <input type="text" name='lastname' value={data.lastname}  onChange={getData} required placeholder='Last Name' id='lastname' className='md:w-[80%] w-full px-4 py-2  bg-[#050E28] rounded-md  text-lg' />
          </div>}
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-lg' >Email Address</label>
            <input type="email" name='email' value={data.email}  onChange={getData} required id='email' placeholder='Enter Email Address' className='md:w-[80%] w-full px-4 py-2  bg-[#050E28] rounded-md  text-lg' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="phone" className='text-lg' >Phone No.</label>
            <input type="tel" name='phoneNumber' value={data.phoneNumber}  onChange={getData} required id='phone' placeholder='Enter Phone Number' className='md:w-[80%] w-full px-4 py-2  bg-[#050E28] rounded-md  text-lg' />
          </div>
        </div>

        <div className='flex flex-col gap-2 '>
          <label htmlFor="position" className='text-lg' >position</label>
          <input type="text" name='position' value={data.position}  onChange={getData} required id='position' placeholder='Enter Job Position' className='md:w-[80%] w-full px-4 py-2  bg-[#050E28] rounded-md  text-lg' />
        </div>

       
          <div className='flex flex-col gap-2'>
            <label htmlFor="joining_date" className='text-lg'>Joining Date</label>
            <input type="date" name='joiningDate' value={data.joiningDate}  onChange={getData} required id='joining_date' className='md:w-[80%] w-full px-1 py-2  bg-[#050E28] rounded-md text-white' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="employee_id" className='text-lg' >Employee Id</label>
            <input type="text" name='employeeId' value={data.employeeId}  onChange={getData} required id='employee_id' placeholder='Enter Employee ID' className='md:w-[80%] w-full px-1  py-2  bg-[#050E28] rounded-md  text-lg' />
          </div>
        <div className='flex flex-col gap-2 mt-2'>
          <label htmlFor="salary" className='text-lg'>Salary</label>
          <input type="number" name='salary' value={data.salary}  onChange={getData} required id='salary' placeholder='Enter Salary' className='md:w-[80%] w-full px-4 py-2  bg-[#050E28] rounded-md  text-lg' />
        </div>
{ 
        <div className='mt-4'>
          <span className='text-lg'>Employee Id Proof</span>
          <div className="relative border-dashed border-gray-600 border-2 mb-5 mt-2 py-5 flex justify-center w-full md:w-[80%]">
            <label
              htmlFor="Employee_id_proof"
              className="flex items-center gap-2 px-4 py-2 bg-[#050E28] text-white rounded-md cursor-pointer hover:bg-[#0a173d] transition duration-300"
            >
              <FiUpload className="text-lg" />
              <span>{fileName || 'Upload ID Proof'}</span>
            </label>

            <input
              type="file"
              required
              id="Employee_id_proof"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>}

        <button className='text-lg bg-[#0075FF] md:w-[80%]  w-80 py-2 mb-20 mt-5 cursor-pointer hover:bg-blue-600 transition-all duration-300 rounded-md'>Save</button>
      </form>
    </div>
  )
}

export default AddEmployee */
