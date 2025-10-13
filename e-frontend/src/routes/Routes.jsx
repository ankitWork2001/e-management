import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import AddEmployee from '../pages/Admin/AddEmployee'
import EmployeeDirectory from '../pages/Admin/EmployeeDirectory'
import LeaveRequests from '../pages/Admin/LeaveRequests'
import DocumentTracker from '../pages/Admin/DocumentTracker'
import AdminProfileView from '../pages/Admin/ProfileView'
import AdminLayout from '../component/adminComponent/AdminLayout'
import EmployeeDashboard from '../pages/Employee/EmployeeDashboard'
import EmployeeLayout from '../component/employeeComponent/EmployeeLayout'
import HRPolicies from '../pages/Employee/HRPolicies'
import Attendance from '../pages/Employee/Attendance'
import ApplyLeave from '../pages/Employee/ApplyLeave'
import DocumentUpload from '../pages/Employee/DocumentUpload'
import Notification from '../pages/Employee/Notification'
import EmployeeProfileView from '../pages/Employee/ProfileView'

const routes = createBrowserRouter([
    {
        path:'/admin',
        element:<AdminLayout/>,
        children:[
            {
                path:'',
                element:<AdminDashboard/>
            },
            {
                path:'add_employee',
                element:<AddEmployee/>
            },
            {
                path:'employee_directory',
                element:<EmployeeDirectory/>
            },
            {
                path:'leave_requests',
                element:<LeaveRequests/>
            },
            {
                path:'document_tracker',
                element:<DocumentTracker/>
            },
            {
                path:'profile_view',
                element:<AdminProfileView/>
            },
        ]
    },
    {
        path:'/employee',
        element:<EmployeeLayout/>,
        children:[
            {
                path:'',
                element:<EmployeeDashboard/>
            },
            {
                path:'hr_policies',
                element:<HRPolicies/>
            },
            {
                path:"attendance",
                element:<Attendance/>
            },
          
            {
                path:"apply_leave",
                element:<ApplyLeave/>
            },
            {
                path:"document_upload",
                element:<DocumentUpload/>
            },
            {
                path:"profile_view",
                element:<EmployeeProfileView/>
            },
            {
                path:"notification",
                element:<Notification/>
            }
        ]
    }
])

function Routes() {
  return (
    <div>
       <RouterProvider router={routes}/>
    </div>
  )
}

export default Routes
