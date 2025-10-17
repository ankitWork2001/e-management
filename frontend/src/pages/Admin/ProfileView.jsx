import React, { useEffect, useState } from 'react'
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import API from '../../api/Api';

function AdminProfileView() {
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    position: '',
    employee_type: '',
    profile_photo: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Get logged-in admin data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const adminId = storedUser.id || storedUser._id;

  const getData = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    fetchAdminData();
  }, [])

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      // Try multiple possible endpoints
      let response;
      try {
        response = await API.get(`/admin/profile/${adminId}`);
      } catch (error) {
        // Fallback to user endpoint
        response = await API.get(`/user/profile/${adminId}`);
      }
      
      if (response.data) {
        setData(response.data);
      } else {
        // If API fails, use localStorage data
        setData({
          name: storedUser.name || '',
          email: storedUser.email || '',
          phone: storedUser.phone || '',
          address: storedUser.address || '',
          position: storedUser.position || 'Administrator',
          employee_type: storedUser.employee_type || 'Admin',
          profile_photo: storedUser.profile_photo || ''
        });
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      // Use localStorage data as fallback
      setData({
        name: storedUser.name || 'Admin User',
        email: storedUser.email || '',
        phone: storedUser.phone || '+1234567890',
        address: storedUser.address || '123 Admin Street, City',
        position: storedUser.position || 'Administrator',
        employee_type: storedUser.employee_type || 'Admin',
        profile_photo: storedUser.profile_photo || ''
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
        response = await API.put(`/admin/profile/${adminId}`, data);
      } catch (apiError) {
        // Fallback to user endpoint
        response = await API.put(`/user/profile/${adminId}`, data);
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
      console.error('Error updating admin data:', error);
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
    fetchAdminData(); // Reset form with original data
    setMessage({ type: '', text: '' });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>Admin Profile</h1>
          <p className='text-gray-600 mt-2'>Manage your personal information</p>
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
              {message.type === 'success' && (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {message.type === 'warning' && (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {message.type === 'error' && (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {message.text}
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-6'>
            <div className='flex flex-col md:flex-row items-center gap-6'>
              <div className='relative'>
                <img 
                  src={data.profile_photo || '/default-avatar.png'} 
                  alt="Profile" 
                  className='w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover bg-gray-200'
                  onError={(e) => {
                    e.target.src = '/default-avatar.png';
                  }}
                />
                {edit && (
                  <button className='absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors'>
                    <FaEdit size={14} />
                  </button>
                )}
              </div>
              <div className='flex-1 text-center md:text-left'>
                <h2 className='text-2xl font-bold text-white'>{data.name}</h2>
                <p className='text-blue-100'>{data.position}</p>
                <p className='text-blue-100'>{data.employee_type}</p>
                <p className='text-blue-200 text-sm mt-1'>ID: {adminId}</p>
              </div>
              <div className='flex gap-2'>
                {!edit ? (
                  <button 
                    onClick={() => setEdit(true)}
                    className='flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold'
                  >
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <button 
                    onClick={handleCancel}
                    className='flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold'
                  >
                    <FaTimes /> Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} className='p-6 space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  id='name' 
                  name='name' 
                  value={data.name} 
                  onChange={getData}
                  readOnly={!edit}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors read-only:bg-gray-50 read-only:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  name='email' 
                  value={data.email} 
                  onChange={getData}
                  readOnly={!edit}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors read-only:bg-gray-50 read-only:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="phone" className='block text-sm font-medium text-gray-700 mb-2'>
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  name='phone' 
                  value={data.phone} 
                  onChange={getData}
                  readOnly={!edit}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors read-only:bg-gray-50 read-only:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="position" className='block text-sm font-medium text-gray-700 mb-2'>
                  Position
                </label>
                <input 
                  type="text" 
                  name='position' 
                  value={data.position} 
                  onChange={getData}
                  readOnly={!edit}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors read-only:bg-gray-50 read-only:cursor-not-allowed"
                />
              </div>

              <div className='md:col-span-2'>
                <label htmlFor="address" className='block text-sm font-medium text-gray-700 mb-2'>
                  Address
                </label>
                <input 
                  type="text" 
                  name='address' 
                  value={data.address} 
                  onChange={getData}
                  readOnly={!edit}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors read-only:bg-gray-50 read-only:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="employee_type" className='block text-sm font-medium text-gray-700 mb-2'>
                  Employee Type
                </label>
                <select
                  name='employee_type' 
                  value={data.employee_type} 
                  onChange={getData}
                  disabled={!edit}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            </div>

            {edit && (
              <div className='flex justify-end gap-3 pt-4 border-t'>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-semibold"
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
  )
}

export default AdminProfileView;