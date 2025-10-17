import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import API from '../../api/Api';

const StyledDataTable = styled(DataTable)`
  .rdt_Table {
    border-radius: 8px;
    overflow: hidden;
  }
  .rdt_TableHead {
    background-color: #f8f9fa;
    border-bottom: 2px solid #e2e8f0;
    font-weight: 600;
  }
  .rdt_TableCol {
    padding: 1rem;
    font-size: 0.875rem;
    color: #4a5568;
  }
  .rdt_TableCell {
    padding: 1rem;
    font-size: 0.875rem;
  }
  .rdt_TableRow {
    border-bottom: 1px solid #e2e8f0;
    &:hover {
      background-color: #f7fafc;
    }
  }
`;

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await API.get('/employees/');
        const formattedData = response.data.map((user) => ({
          id: user.id,
          name: user.name || '', // fallback to empty string
          email: user.email || '',
          phone: user.phone || '',
          position: user.position || '',
          department: user.position || '', // optional, same as position
          status: user.status || 'Inactive',
        }));

        setEmployees(formattedData);
        setFilteredEmployees(formattedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please check the API endpoint.');
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Filter employees
  useEffect(() => {
    const lowercasedFilterText = filterText.toLowerCase();

    const filtered = employees.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(lowercasedFilterText);
      const roleMatch = item.position?.toLowerCase().includes(lowercasedFilterText);
      const departmentMatch = item.department?.toLowerCase().includes(lowercasedFilterText);

      if (filterCategory === 'all') {
        return nameMatch || roleMatch || departmentMatch;
      } else if (filterCategory === 'name') {
        return nameMatch;
      } else if (filterCategory === 'role') {
        return roleMatch;
      }
      return false;
    });

    setFilteredEmployees(filtered);
  }, [filterText, filterCategory, employees]);

  const columns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Email', selector: (row) => row.email },
    {/* name: 'Phone', selector: (row) => row.phone, sortable: true*/ },
    { name: 'Role', selector: (row) => row.position },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {/*
      name: 'Actions',
      cell: () => (
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-red-500">
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,*/
    },
  ];

  return (
    <div className="flex bg-[#001434] justify-center items-center min-h-screen">
      <div className="p-8 mr-30 ml-30 w-500 md:w-[800px] bg-[#001434] min-h-screen">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-blue-600 mr-20 mb-5">Employees</h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search employees"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="pl-10 pr-4 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:border-gray-400 transition-colors"
              >
                <option value="all">Sort by: All</option>
                <option value="name">Name</option>
                <option value="role">Role</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-gray-500">Loading employees...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">Error: {error}</div>
          ) : (
            <StyledDataTable
              columns={columns}
              data={filteredEmployees}
              pagination
              highlightOnHover
              pointerOnHover
              responsive
              noHeader
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDirectory;





/*
import React, { useEffect, useState } from 'react'


import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';

import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import API from '../../api/Api';

const StyledDataTable = styled(DataTable)`
  .rdt_Table {
    border-radius: 8px;
    overflow: hidden;
  }
  .rdt_TableHead {
    background-color: #f8f9fa;
    border-bottom: 2px solid #e2e8f0;
    font-weight: 600;
  }
  .rdt_TableCol {
    padding: 1rem;
    font-size: 0.875rem;
    color: #4a5568;
  }
  .rdt_TableCell {
    padding: 1rem;
    font-size: 0.875rem;
  }
  .rdt_TableRow {
    border-bottom: 1px solid #e2e8f0;
    &:hover {
      background-color: #f7fafc;
    }
  }
`;




function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchEmployees = async () => {
      try {

        const response = await API.get("/employees/");

        const formattedData = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          department: user.position,
          status: user.status,
        }));

        setEmployees(formattedData);
        setFilteredEmployees(formattedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please check the API endpoint.');
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);


  useEffect(() => {
    const filtered = employees.filter((item) => {
      const lowercasedFilterText = filterText.toLowerCase();

      const nameMatch = item.name.toLowerCase().includes(lowercasedFilterText);
      const roleMatch = item.role.toLowerCase().includes(lowercasedFilterText);
      

      if (filterCategory === 'all') {
        return nameMatch || roleMatch || departmentMatch;
      } else if (filterCategory === 'name') {
        return nameMatch;
      } else if (filterCategory === 'role') {
        return roleMatch;
      }
      return false;
    });

    setFilteredEmployees(filtered);
  }, [filterText, filterCategory, employees]);

  const columns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Email', selector: (row) => row.email },
    { name: 'number', selector: (row) => row.phone, sortable: true },
    { name: 'role', selector: (row) => row.position },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
            }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: () => (
        <div className="flex space-x-2">

          <button className="text-gray-400 hover:text-green-500">
            {/*<FaEdit />}
          </button>
          <button className="text-gray-400 hover:text-red-500">
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];




  return (
    <div className="flex bg-[#001434] justify-center items-center min-h-screen ">

      <div className="p-8 mr-30 ml-30 w-500 md:w-[800px] bg-[#001434] min-h-screen ">

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-blue-600 mr-20 mb-5">Employees</h1>
            <div className="flex items-center space-x-4">

              <div className="">
               
                <input
                  type="text"
                  placeholder="Search employees"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="pl-10 pr-4 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:border-gray-400 transition-colors"
              >
                <option value="all">Sort by: All</option>
                <option value="name">Name</option>
                <option value="role">Role</option>
                
              </select>


            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-gray-500">Loading employees...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">Error: {error}</div>
          ) : (
            <StyledDataTable
              columns={columns}
              data={filteredEmployees}
              pagination
              highlightOnHover
              pointerOnHover
              responsive
              noHeader
            />
          )}
        </div>
      </div>
    </div>)
}

export default EmployeeDirectory
*/