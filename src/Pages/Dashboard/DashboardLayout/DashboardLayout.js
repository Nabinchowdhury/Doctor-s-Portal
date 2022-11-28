import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import Navbar from '../../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)

    const [isAdmin] = useAdmin(user?.email)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard_drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* <!-- Page content here --> */}
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard_drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80  text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to="/dashboard">My Appointment</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to="/dashboard/admin/allUsers">All Users</Link></li>
                                <li><Link to="/dashboard/admin/addDoctor">Add Doctor</Link></li>
                                <li><Link to="/dashboard/admin/manageDoctors">Manage Doctors</Link></li>
                            </>}

                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;