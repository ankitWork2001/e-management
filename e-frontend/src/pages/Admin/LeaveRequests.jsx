import React, { useEffect, useState } from 'react';
import API from '../../api/Api';

function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leave requests from backend
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await API.get('/leaves/');
        setLeaveRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leave requests.');
        setLoading(false);
      }
    };
    fetchLeaveRequests();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading leave requests...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <div className="mt-10 px-5">
      <div className="flex gap-10">
        <div className="flex gap-3">
          <p className="text-lg">Employee</p>
          <select className="md:px-10 px-5 py-2 bg-[#1A1A1A] text-gray-400 text-sm rounded-md border border-gray-700 focus:outline-none ">
            <option value="all">All</option>
          </select>
        </div>
        <div className="flex gap-3">
          <p className="text-lg">Date</p>
          <select className=" md:px-6 px-3 py-2 bg-[#1A1A1A] text-gray-400 text-sm rounded-md border border-gray-700 focus:outline-none ">
            <option value="this_week">This Week</option>
          </select>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2">Employee Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Reason / Type</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={index} className="text-[#A0AEC0] border-b border-gray-700">
                <td className="px-5 py-3 w-[25%]">{request.name || request.employeeId?.name || 'N/A'}</td>
                <td className="px-5 py-3 w-[25%]">
                  {request.startDate && request.endDate
                    ? `${new Date(request.startDate).toLocaleDateString()} - ${new Date(
                        request.endDate
                      ).toLocaleDateString()}`
                    : 'N/A'}
                </td>
                <td className="px-5 py-3 w-[25%]">{request.reason || 'N/A'}</td>
                <td className="flex justify-center py-3 px-5">
                  {Array.isArray(request.status)
                    ? request.status.map((option, idx) => (
                        <button
                          key={idx}
                          className={`${
                            option === 'Approve' ? 'bg-[#21AF5A]' : 'bg-[#DA3B32]'
                          } text-white px-3 rounded mr-3 hover:cursor-pointer`}
                        >
                          {option}
                        </button>
                      ))
                    : request.status === 'Approved'
                    ? <p className="text-[#21AF5A]">{request.status}</p>
                    : request.status === 'Rejected'
                    ? <p className="text-[#DA3B32]">{request.status}</p>
                    : <p>{request.status || 'Pending'}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveRequests;
