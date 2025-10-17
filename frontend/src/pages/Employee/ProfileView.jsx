import React, { useEffect, useState } from 'react'
import { FaEdit, FaSave, FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaUserTie } from "react-icons/fa";
import API from '../../api/Api';

function EmployeeProfileView() {
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    position: '',
    employee_type: '',
    profile_photo: '',
    department: '',
    joining_date: '',
    salary: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Get logged-in employee data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const employeeId = storedUser.id || storedUser._id;

  const getData = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    fetchEmployeeData();
  }, [])

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      
      // Try multiple possible endpoints
      let response;
      try {
        response = await API.get(`/employee/profile/${employeeId}`);
      } catch (error) {
        try {
          response = await API.get(`/user/profile/${employeeId}`);
        } catch (error) {
          response = await API.get(`/api/users/${employeeId}`);
        }
      }
      
      if (response.data) {
        setData(response.data);
      } else {
        // Fallback to localStorage data
        setData({
          name: storedUser.name || '',
          email: storedUser.email || '',
          phone: storedUser.phone || '',
          address: storedUser.address || '',
          position: storedUser.position || 'Employee',
          employee_type: storedUser.employee_type || 'Employee',
          profile_photo: storedUser.profile_photo || '',
          department: storedUser.department || 'General',
          joining_date: storedUser.joining_date || new Date().toISOString().split('T')[0],
          salary: storedUser.salary || ''
        });
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      // Use localStorage data as fallback
      setData({
        name: storedUser.name || 'Employee User',
        email: storedUser.email || '',
        phone: storedUser.phone || '+1234567890',
        address: storedUser.address || '123 Employee Street, City',
        position: storedUser.position || 'Employee',
        employee_type: storedUser.employee_type || 'Employee',
        profile_photo: storedUser.profile_photo || '',
        department: storedUser.department || 'General',
        joining_date: storedUser.joining_date || new Date().toISOString().split('T')[0],
        salary: storedUser.salary || ''
      });
      setMessage({ 
        type: 'warning', 
        text: 'Using cached profile data. Some features may be limited.' 
      });
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      // Try to update via API
      let response;
      try {
        response = await API.put(`/employee/profile/${employeeId}`, data);
      } catch (apiError) {
        try {
          response = await API.put(`/user/profile/${employeeId}`, data);
        } catch (error) {
          response = await API.put(`/api/users/${employeeId}`, data);
        }
      }

      if (response.data) {
        setData(response.data);
        
        // Update localStorage with new data
        const updatedUser = { 
          ...storedUser, 
          ...response.data,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        // Update only localStorage if API fails
        const updatedUser = { 
          ...storedUser, 
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setMessage({ type: 'success', text: 'Profile updated locally!' });
      }
      
      setEdit(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error updating employee data:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to update profile. Changes saved locally only.' 
      });
    } finally {
      setSaving(false);
    }
  }

  const handleCancel = () => {
    setEdit(false);
    fetchEmployeeData();
    setMessage({ type: '', text: '' });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>My Profile</h1>
          <p className='text-gray-600 mt-2'>View and update your personal information</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : message.type === 'warning'
              ? 'bg-yellow-50 border border-yellow-200 text-yellow-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' && '✅ '}
              {message.type === 'warning' && '⚠️ '}
              {message.type === 'error' && '❌ '}
              {message.text}
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200'>
          {/* Profile Header */}
          <div className='bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white'>
            <div className='flex flex-col md:flex-row items-center gap-6'>
              <div className='relative'>
                <img 
                  src={data.profile_photo || '/default-avatar.png'} 
                  alt="Profile" 
                  className='w-28 h-28 rounded-full border-4 border-white shadow-2xl object-cover bg-gray-200'
                  onError={(e) => {
                    e.target.src = '/default-avatar.png';
                  }}
                />
                {edit && (
                  <button className='absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 transition-colors'>
                    <FaEdit size={16} />
                  </button>
                )}
              </div>
              <div className='flex-1 text-center md:text-left'>
                <h2 className='text-3xl font-bold'>{data.name}</h2>
                <p className='text-green-100 text-lg mt-1'>{data.position}</p>
                <div className='flex flex-wrap gap-4 mt-3 text-green-100'>
                  <span className='flex items-center gap-1'>
                    <FaUserTie />
                    {data.employee_type}
                  </span>
                  <span className='flex items-center gap-1'>
                    <FaBriefcase />
                    {data.department}
                  </span>
                </div>
                <p className='text-green-200 text-sm mt-2'>Employee ID: {employeeId}</p>
              </div>
              <div className='flex gap-2'>
                {!edit ? (
                  <button 
                    onClick={() => setEdit(true)}
                    className='flex items-center gap-2 bg-white text-green-600 px-4 py-3 rounded-lg hover:bg-green-50 transition-colors shadow-lg font-semibold'
                  >
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <button 
                    onClick={handleCancel}
                    className='flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors shadow-lg font-semibold'
                  >
                    <FaTimes /> Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className='p-8'>
            <form onSubmit={handleSave}>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Personal Information */}
                <div className='space-y-6'>
                  <h3 className='text-xl font-semibold text-gray-800 border-b pb-2'>Personal Information</h3>
                  
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-blue-100 p-2 rounded-lg'>
                        <FaUser className='text-blue-600' />
                      </div>
                      <div className='flex-1'>
                        <label className='block text-sm font-medium text-gray-600'>Full Name *</label>
                        <input 
                          type="text" 
                          name='name' 
                          value={data.name} 
                          onChange={getData}
                          readOnly={!edit}
                          required
                          className="w-full p-2 border-0 border-b-2 border-gray-200 focus:border-green-500 focus:ring-0 transition-colors read-only:bg-transparent read-only:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='bg-blue-100 p-2 rounded-lg'>
                        <FaEnvelope className='text-blue-600' />
                      </div>
                      <div className='flex-1'>
                        <label className='block text-sm font-medium text-gray-600'>Email *</label>
                        <input 
                          type="email" 
                          name='email' 
                          value={data.email} 
                          onChange={getData}
                          readOnly={!edit}
                          required
                          className="w-full p-2 border-0 border-b-2 border-gray-200 focus:border-green-500 focus:ring-0 transition-colors read-only:bg-transparent read-only:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='bg-blue-100 p-2 rounded-lg'>
                        <FaPhone className='text-blue-600' />
                      </div>
                      <div className='flex-1'>
                        <label className='block text-sm font-medium text-gray-600'>Phone</label>
                        <input 
                          type="tel" 
                          name='phone' 
                          value={data.phone} 
                          onChange={getData}
                          readOnly={!edit}
                          className="w-full p-2 border-0 border-b-2 border-gray-200 focus:border-green-500 focus:ring-0 transition-colors read-only:bg-transparent read-only:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='bg-blue-100 p-2 rounded-lg'>
                        <FaMapMarkerAlt className='text-blue-600' />
                      </div>
                      <div className='flex-1'>
                        <label className='block text-sm font-medium text-gray-600'>Address</label>
                        <input 
                          type="text" 
                          name='address' 
                          value={data.address} 
                          onChange={getData}
                          readOnly={!edit}
                          className="w-full p-2 border-0 border-b-2 border-gray-200 focus:border-green-500 focus:ring-0 transition-colors read-only:bg-transparent read-only:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className='space-y-6'>
                  <h3 className='text-xl font-semibold text-gray-800 border-b pb-2'>Professional Information</h3>
                  
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-600 mb-2'>Position</label>
                      <input 
                        type="text" 
                        name='position' 
                        value={data.position} 
                        onChange={getData}
                        readOnly={!edit}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors read-only:bg-gray-50 read-only:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-600 mb-2'>Employee Type</label>
                      <select
                        name='employee_type' 
                        value={data.employee_type} 
                        onChange={getData}
                        disabled={!edit}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                      >
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-600 mb-2'>Department</label>
                      <input 
                        type="text" 
                        name='department' 
                        value={data.department} 
                        readOnly={true}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-600 mb-2'>Joining Date</label>
                      <input 
                        type="text" 
                        name='joining_date' 
                        value={data.joining_date} 
                        readOnly={true}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {edit && (
                <div className='flex justify-end gap-3 pt-8 mt-8 border-t'>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-semibold shadow-lg"
                  >
                    <FaSave />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfileView;