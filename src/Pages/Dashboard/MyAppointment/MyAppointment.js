import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyAppointment = () => {
    const { user } = useContext(AuthContext)
    const { data: bookings = [] } = useQuery({
        queryKey: ["booking"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("AccessToken")}`
                }
            })
            // console.log(res);
            const data = await res.json()
            // console.log(data)
            return data;
        }
    })
    // console.log(bookings)
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Treatment</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map((booking, i) => <tr key={booking._id} className="hover">
                            <th>{i + 1}</th>
                            <td>{booking.patient}</td>
                            <td>{booking.treatment}</td>
                            <td>{booking.appointmentDate}</td>
                            <td>{booking.slot}</td>
                            < td >
                                {
                                    booking?.price && !booking?.paid && <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-info btn-sm'>Pay</button></Link>
                                }
                                {
                                    booking?.price && booking?.paid && <span>Paid</span>
                                }
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div >
    );
};

export default MyAppointment;