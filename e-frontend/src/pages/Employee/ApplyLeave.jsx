import React, { useState } from 'react';
import API from '../../api/Api';

function ApplyLeave() {
  const [data, setData] = useState({
    from: "",
    to: "",
    reason: "",
  });

  function getdata(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  }

  const submitData = async () => {
    try {
      // Map frontend fields to backend expected fields if needed
      const payload = {
        startDate: data.from,
        endDate: data.to,
        reason: data.reason,
      };

      const response = await API.post('/leaves/apply', payload);

      if (response.status === 201) {
        alert('Leave applied successfully');
        setData({ from: "", to: "", reason: "" });
      }
    } catch (error) {
      console.error('Error applying leave:', error);
      alert('Failed to apply leave. Check console for details.');
    }
  };

  return (
    <div className='space-y-8 pl-5 my-10'>
      <div className='flex flex-col gap-2 '>
        <label className='text-xl font-semibold'>Leave Date</label>
        <div className='flex md:gap-14 gap-6 md:flex-row flex-col'>
          <div className='flex flex-col gap-1'>
            <label className='text-xl text-[#7A97B5]'>From</label>
            <input
              type="date"
              name="from"
              value={data.from}
              onChange={getdata}
              className='bg-white text-lg cursor-pointer text-black px-4 py-2 rounded-4xl'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-xl text-[#7A97B5]'>To</label>
            <input
              type="date"
              name="to"
              value={data.to}
              onChange={getdata}
              className='bg-white text-lg cursor-pointer text-black px-4 py-2 rounded-4xl'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2 md:w-[70%] '>
        <label htmlFor="reason" className='text-xl font-semibold'>Reason</label>
        <textarea
          id="reason"
          name="reason"
          placeholder='Reason'
          value={data.reason}
          onChange={getdata}
          className='border border-[#7A97B5] px-3 py-3 text-lg'
        />
      </div>

      <button
        className=' bg-[#0075FF] md:w-42 py-3 mb-2  w-full  rounded text-xl font-semibold cursor-pointer'
        onClick={submitData}
      >
        Submit
      </button>
    </div>
  );
}

export default ApplyLeave;
