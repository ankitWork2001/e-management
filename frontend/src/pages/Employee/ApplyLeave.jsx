import React, { useEffect, useState } from 'react';
import API from '../../api/Api';

function ApplyLeave() {
  const [activeTab, setActiveTab] = useState('apply');
  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Annual',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: ''
  });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [employeeId] = useState('65d8a1b4c8e9f4a7b3c2d1e0'); // Hardcoded for testing

  // Calculate total days
  const calculateDays = () => {
    if (leaveForm.startDate && leaveForm.endDate) {
      const start = new Date(leaveForm.startDate);
      const end = new Date(leaveForm.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchLeaveNotifications();
  }, []);

  // Fetch notifications specifically for the employee
  const fetchLeaveNotifications = async () => {
    try {
      console.log('Fetching notifications for employee:', employeeId);

      // Option 1: If you have a specific endpoint for employee notifications
      const response = await API.get(`/notifications/employee/${employeeId}`);

      // Option 2: If you're using the general notifications endpoint with filtering
      // const response = await API.get('/notifications');

      console.log('Notifications response:', response.data);

      // Handle different response structures
      let notificationsData = [];

      if (response.data && Array.isArray(response.data)) {
        notificationsData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        notificationsData = response.data.data;
      } else if (response.data && response.data.notifications) {
        notificationsData = response.data.notifications;
      }

      // Filter only leave-related notifications
      const leaveNotifications = notificationsData.filter(notification =>
        notification.type === 'leave_status' ||
        notification.type === 'leave_approved' ||
        notification.type === 'leave_rejected' ||
        (notification.title && notification.title.toLowerCase().includes('leave')) ||
        (notification.message && notification.message.toLowerCase().includes('leave'))
      );

      console.log('Filtered leave notifications:', leaveNotifications);
      setNotifications(leaveNotifications);

    } catch (err) {
      console.error('Error fetching notifications:', err);

      // If the endpoint doesn't exist, create mock data for testing
      if (err.response?.status === 404) {
        console.log('Notifications endpoint not found, using mock data');
        const mockNotifications = [
          {
            _id: '1',
            title: 'Leave Request Approved',
            message: 'Your annual leave request from Jan 15-18 has been approved.',
            type: 'leave_approved',
            createdAt: new Date().toISOString(),
            isRead: false
          },
          {
            _id: '2',
            title: 'Leave Request Rejected',
            message: 'Your sick leave request for Jan 20 has been rejected due to insufficient notice.',
            type: 'leave_rejected',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            isRead: false
          }
        ];
        setNotifications(mockNotifications);
      } else {
        setNotifications([]);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('=== FRONTEND DEBUG ===');
      console.log('Raw form state:', leaveForm);
      console.log('Individual fields:', {
        leaveType: leaveForm.leaveType,
        startDate: leaveForm.startDate,
        endDate: leaveForm.endDate,
        reason: leaveForm.reason,
        emergencyContact: leaveForm.emergencyContact
      });

      // Check if any fields are empty
      const emptyFields = [];
      if (!leaveForm.leaveType || leaveForm.leaveType.trim() === '') emptyFields.push('leaveType');
      if (!leaveForm.startDate || leaveForm.startDate.trim() === '') emptyFields.push('startDate');
      if (!leaveForm.endDate || leaveForm.endDate.trim() === '') emptyFields.push('endDate');
      if (!leaveForm.reason || leaveForm.reason.trim() === '') emptyFields.push('reason');
      if (!leaveForm.emergencyContact || leaveForm.emergencyContact.trim() === '') emptyFields.push('emergencyContact');

      if (emptyFields.length > 0) {
        console.log('Empty fields detected:', emptyFields);
        setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
        setLoading(false);
        return;
      }

      // Prepare data with all required fields
      const leaveData = {
        leaveType: leaveForm.leaveType,
        startDate: leaveForm.startDate,
        endDate: leaveForm.endDate,
        reason: leaveForm.reason,
        emergencyContact: leaveForm.emergencyContact,
        employeeId: '65d8a1b4c8e9f4a7b3c2d1e0' // Hardcoded for testing
      };

      console.log('Sending data to server:', leaveData);

      const response = await API.post('/leaves/apply', leaveData);
      console.log('Server response:', response.data);

      setSuccess('Leave application submitted successfully!');
      setLeaveForm({
        leaveType: 'Annual',
        startDate: '',
        endDate: '',
        reason: '',
        emergencyContact: ''
      });

    } catch (err) {
      console.error('Leave application error:', err);
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to submit leave application';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const markNotificationAsRead = async (notificationId) => {
    try {
      console.log('Marking notification as read:', notificationId);

      // Try the specific endpoint first
      await API.put(`/notifications/${notificationId}/read`, {
        employeeId: employeeId
      });

      // Remove the notification from local state
      setNotifications(prev => prev.filter(notif => notif._id !== notificationId));

    } catch (err) {
      console.error('Error marking notification as read:', err);
      // If API call fails, still remove from UI for better UX
      setNotifications(prev => prev.filter(notif => notif._id !== notificationId));
    }
  };

  const createTestLeaveNotification = async () => {
    try {
      // Try to create a test notification through API
      await API.post('/notifications', {
        employeeId: employeeId,
        title: 'Test Leave Approval',
        message: 'This is a test notification for leave approval.',
        type: 'leave_approved'
      });

      // Refresh notifications
      fetchLeaveNotifications();

    } catch (err) {
      console.error('Error creating test notification:', err);

      // If API fails, create a local test notification
      const testNotification = {
        _id: 'test-' + Date.now(),
        title: 'Test Leave Status',
        message: 'Your test leave request has been processed successfully.',
        type: 'leave_approved',
        createdAt: new Date().toISOString(),
        isRead: false
      };

      setNotifications(prev => [testNotification, ...prev]);
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'leave_approved':
      case 'leave_status':
        return '✅';
      case 'leave_rejected':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  // Get notification color based on type
  const getNotificationColor = (type) => {
    switch (type) {
      case 'leave_approved':
      case 'leave_status':
        return 'border-green-500 bg-green-500/10';
      case 'leave_rejected':
        return 'border-red-500 bg-red-500/10';
      default:
        return 'border-blue-500 bg-blue-500/10';
    }
  };

  // Safe array check for rendering
  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  // Sort notifications by date (newest first)
  const sortedNotifications = [...safeNotifications].sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Leave Management</h1>
          <p className="text-gray-400">Apply for leave and track your applications</p>
          <p className="text-sm text-yellow-400 mt-1">Testing Mode - Employee ID: {employeeId}</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('apply')}
            className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors flex-1 justify-center ${activeTab === 'apply'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
          >
            Apply Leave
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors flex-1 justify-center ${activeTab === 'notifications'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
          >
            Leave Status ({sortedNotifications.length})
          </button>
        </div>

        {/* Apply Leave Tab */}
        {activeTab === 'apply' && (
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Apply for Leave</h2>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmitLeave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Leave Type
                  </label>
                  <select
                    name="leaveType"
                    value={leaveForm.leaveType}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Annual">Annual Leave</option>
                    <option value="Sick">Sick Leave</option>
                    <option value="Emergency">Emergency Leave</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={leaveForm.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={leaveForm.startDate}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={leaveForm.endDate}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {calculateDays() > 0 && (
                <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4">
                  <p className="text-blue-200">
                    Total leave days: <span className="font-bold text-white">{calculateDays()} days</span>
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Reason for Leave
                </label>
                <textarea
                  name="reason"
                  value={leaveForm.reason}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Please provide reason for your leave request..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notifications Tab - Now shows only leave status updates */}
        {activeTab === 'notifications' && (
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Leave Status Updates</h2>
              <div className="flex gap-2">
                <button
                  onClick={createTestLeaveNotification}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Create Test
                </button>
                <button
                  onClick={fetchLeaveNotifications}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Refresh
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-sm">
                Here you'll see updates about your leave requests - approvals, rejections, and other status changes.
              </p>
            </div>

            {sortedNotifications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-4xl mb-4">📭</div>
                <p className="text-lg mb-2">No leave status updates</p>
                <p className="text-sm">You'll see notifications here when your leave requests are processed</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedNotifications.map((notification) => (
                  <div
                    key={notification._id || notification.id}
                    className={`rounded-xl p-4 border-2 ${getNotificationColor(notification.type)} transition-all hover:scale-[1.02] cursor-pointer`}
                    onClick={() => markNotificationAsRead(notification._id || notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-semibold text-lg">
                            {notification.title || 'Leave Status Update'}
                          </h3>
                          <span className="text-gray-400 text-sm">
                            {notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : 'Unknown date'}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3">{notification.message || 'No message'}</p>

                        {/* Show notification type badge */}
                        {notification.type && (
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${notification.type === 'leave_approved' || notification.type === 'leave_status' ? 'bg-green-500 text-white' :
                              notification.type === 'leave_rejected' ? 'bg-red-500 text-white' :
                                'bg-blue-500 text-white'
                            }`}>
                            {notification.type.replace('_', ' ').toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplyLeave;