import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Appointment/Appointment/Loading/Loading';


const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgBBHost = process.env.REACT_APP_imgBb_API
    // console.log(imgBBHost)
    const navigate = useNavigate()
    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ["specialty"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/doctorSpecialty")
            const data = await res.json()
            return data
        }

    })

    if (isLoading) {
        return <Loading></Loading>
    }
    const handleAddDoctor = (data) => {
        // console.log(data)
        const image = data.img[0]
        // console.log(image);
        const formData = new FormData()
        formData.append("image", image)
        const url = `https://api.imgbb.com/1/upload?key=${imgBBHost}`

        fetch(url, {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url)
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    // console.log(doctor)
                    fetch(`http://localhost:5000/doctor`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `bearer ${localStorage.getItem('AccessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    }).then(res => res.json())
                        .then(result => {
                            toast.success(`${data.name} added successfully`)
                            navigate("/dashboard/admin/manageDoctors")
                            // console.log(data)
                        })

                }

            })
    }
    return (
        <div className='w-96 p-7'>
            <h2 className='text-xl text-center'>Add A Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email" {...register("email", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Specialty</span></label>

                    <select
                        {...register("specialty", {
                            required: "specialty is Required"
                        })} className="select select-bordered w-full max-w-xs">
                        {
                            specialties.map(specialty => <option key={specialty._id}>{specialty.name}</option>)
                        }


                    </select>
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="file" {...register("img", {
                        required: "Image is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>

                <input className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />

            </form>


        </div>
    );
};

export default AddDoctor;