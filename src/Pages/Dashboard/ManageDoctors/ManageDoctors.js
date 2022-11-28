import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Appointment/Appointment/Loading/Loading';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null)
    const { data: doctors, isLoading, refetch } = useQuery(
        {
            queryKey: ['doctor'],
            queryFn: async () => {
                try {
                    const res = await fetch(`http://localhost:5000/doctor`, {
                        headers: {
                            authorization: `bearer ${localStorage.getItem("AccessToken")}`
                        }
                    })
                    const data = res.json()
                    return data
                } catch (err) {
                    console.error(err)
                }
            }
        }
    )

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleCancel = () => {
        setDeletingDoctor(null)
    }

    const handledeleteDoctor = (doctor) => {

        try {

            fetch(`http://localhost:5000/doctor/${doctor._id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${localStorage.getItem("AccessToken")}`
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch()
                        toast.success("deleted Succesfully")
                    }
                })
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div>
            <h1 className="text-lg">Available doctors: {doctors?.length}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={doctor.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label
                                        onClick={() => setDeletingDoctor(doctor)}
                                        htmlFor="confirmationModal" className="btn btn-sm">Delete</label>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
                {deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete doctor ${deletingDoctor.name}`}
                    message={`You will not get doctor ${deletingDoctor.name} again`}
                    modalData={deletingDoctor}
                    successAction={handledeleteDoctor}
                    handleCancel={handleCancel}
                ></ConfirmationModal>}
            </div>

        </div>
    );
};

export default ManageDoctors;