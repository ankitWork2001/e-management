import React, { useEffect, useState } from 'react';
import API from '../../api/Api';

function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterEmployee, setFilterEmployee] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [employees, setEmployees] = useState([]);
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch leave requests and employees from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch leave requests
        const leaveResponse = await API.get('/leaves/');
        console.log('Leave response:', leaveResponse.data);
        
        // Handle different response structures
        const leavesData = leaveResponse.data.data || leaveResponse.data || [];
        setLeaveRequests(Array.isArray(leavesData) ? leavesData : []);

        // Fetch employees for filter
        try {
          const employeeResponse = await API.get('/employees/');
          console.log('Employees response:', employeeResponse.data);
          const employeesData = employeeResponse.data.data || employeeResponse.data || [];
          setEmployees(Array.isArray(employeesData) ? employeesData : []);
        } catch (employeeErr) {
          console.error('Error fetching employees:', employeeErr);
          setEmployees([]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle approve/reject leave request
  const handleLeaveAction = async (leaveId, action) => {
    try {
      setActionLoading(leaveId);
      
      console.log(`Updating leave ${leaveId} to ${action}`);
      
      const response = await API.put(`/leaves/${leaveId}`, {
        status: action
      });

      console.log('Update response:', response.data);

      // Update the leave request in state
      setLeaveRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === leaveId ? { ...request, status: action } : request
        )
      );

      // Show success message
      console.log(`Leave request ${action.toLowerCase()} successfully`);
      
    } catch (err) {
      console.error('Error updating leave request:', err);
      setError(`Failed to ${action.toLowerCase()} leave request.`);
    } finally {
      setActionLoading(null);
    }
  };

  // Filter leave requests based on selected filters
  const filteredRequests = leaveRequests.filter(request => {
    // Filter by employee
    if (filterEmployee !== 'all') {
      // Handle both populated employeeId object and string employeeId
      const employeeId = request.employeeId?._id || request.employeeId;
      if (employeeId !== filterEmployee) {
        return false;
      }
    }

    // Filter by date
    if (filterDate !== 'all') {
      const today = new Date();
      const startDate = new Date(request.startDate);
      
      switch (filterDate) {
        case 'this_week':
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          return startDate >= startOfWeek;
        case 'this_month':
          return startDate.getMonth() === today.getMonth() && 
                 startDate.getFullYear() === today.getFullYear();
        case 'pending':
          return request.status === 'Pending';
        default:
          return true;
      }
    }

    return true;
  });

  // Safe array checks
  const safeLeaveRequests = Array.isArray(leaveRequests) ? leaveRequests : [];
  const safeEmployees = Array.isArray(employees) ? employees : [];
  const safeFilteredRequests = Array.isArray(filteredRequests) ? filteredRequests : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-500">Loading leave requests...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg max-w-md mx-auto">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 px-5">
      <div className="flex gap-10 flex-wrap">
        {/* Employee Filter */}
        <div className="flex gap-3 items-center">
          <p className="text-lg text-white">Employee</p>
          <select 
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            className="md:px-6 px-4 py-2 bg-[#1A1A1A] text-gray-400 text-sm rounded-md border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Employees</option>
            {safeEmployees.map(employee => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex gap-3 items-center">
          <p className="text-lg text-white">Filter</p>
          <select 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="md:px-6 px-4 py-2 bg-[#1A1A1A] text-gray-400 text-sm rounded-md border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Dates</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="pending">Pending Only</option>
          </select>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto">
        {safeFilteredRequests.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No leave requests found matching your filters.
          </div>
        ) : (
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Employee Name</th>
                <th className="px-4 py-3 font-semibold">Leave Dates</th>
                <th className="px-4 py-3 font-semibold">Reason / Type</th>
                <th className="px-4 py-3 font-semibold">Days</th>
                <th className="px-4 py-3 font-semibold text-center">Status</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {safeFilteredRequests.map((request) => (
                <tr key={request._id} className="text-[#A0AEC0] border-b border-gray-700 hover:bg-gray-800 transition-colors">
                  {/* Employee Name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-semibold">
                          {/* Handle both populated employee object and direct employeeId */}
                          {request.employeeId?.name?.charAt(0) || 'E'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {request.employeeId?.name || 'Employee'}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {request.employeeId?.position || 'Employee'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Leave Dates */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-white">
                        {request.startDate ? new Date(request.startDate).toLocaleDateString() : 'N/A'}
                      </span>
                      <span className="text-gray-400 text-sm">to</span>
                      <span className="text-white">
                        {request.endDate ? new Date(request.endDate).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </td>

                  {/* Reason / Type */}
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white font-medium">{request.leaveType || 'Annual Leave'}</p>
                      <p className="text-gray-400 text-sm mt-1">{request.reason || 'No reason provided'}</p>
                    </div>
                  </td>

                  {/* Days */}
                  <td className="px-4 py-3">
                    <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {request.days || 'N/A'} days
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-center">
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${request.status === 'Approved' 
                        ? 'bg-green-900 text-green-200' 
                        : request.status === 'Rejected' 
                        ? 'bg-red-900 text-red-200'
                        : 'bg-yellow-900 text-yellow-200'
                      }
                    `}>
                      {request.status || 'Pending'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-center">
                    {request.status === 'Pending' ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleLeaveAction(request._id, 'Approved')}
                          disabled={actionLoading === request._id}
                          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                          {actionLoading === request._id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                          ) : (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {actionLoading === request._id ? 'Updating...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleLeaveAction(request._id, 'Rejected')}
                          disabled={actionLoading === request._id}
                          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                          {actionLoading === request._id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                          ) : (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          {actionLoading === request._id ? 'Updating...' : 'Reject'}
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">Action completed</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">Total Requests</p>
          <p className="text-white text-2xl font-bold">{safeFilteredRequests.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-yellow-400 text-2xl font-bold">
            {safeFilteredRequests.filter(req => req.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">Approved</p>
          <p className="text-green-400 text-2xl font-bold">
            {safeFilteredRequests.filter(req => req.status === 'Approved').length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequests;