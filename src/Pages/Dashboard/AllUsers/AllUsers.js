
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {
    // const [isAdmin, setIsAdmin] = useState(false)
    const { data: users = [], refetch } = useQuery({
        queryKey: ["allUser"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allUsers`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("AccessToken")}`
                }
            })
            const data = await res.json()
            // console.log(data)
            return data
        }


    })
    const handleUpdateUserAction = (id) => {

        fetch(`http://localhost:5000/users/${id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem("AccessToken")}`
            }

        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Admin added")

                    refetch()
                    console.log(data)
                }
            })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users?.map((user, i) => <tr key={user._id}>
                            <th>{i + 1}</th>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>
                                {user?.role !== "Admin" && <button className='btn btn-primary' onClick={() => handleUpdateUserAction(user._id)}>Make Admin</button>
                                }</td>
                            <td><button className='btn btn-error'>Delete</button></td>
                        </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;