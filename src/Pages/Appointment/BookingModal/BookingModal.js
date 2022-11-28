import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    // treatment is just another name of appointmentOptions with name, slots, _id
    const { name, slots, _id, price } = treatment;
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext)
    // console.log(user)

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        // console.log(slot)
        const patient = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        // const price = form.price.value;
        // [3, 4, 5].map((value, i) => console.log(value))
        const booking = {
            appointmentDate: date,
            treatment: name,
            treatment_id: _id,
            patient,
            slot,
            email,
            phone,
            price
        }
        console.log(booking);
        // TODO: send data to the server
        // and once data is saved then close the modal 
        // and display success toast

        // console.log(booking);

        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        }).then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    // console.log(data)
                    toast("Booking Successfull")
                    setTreatment(null);
                    refetch()
                }
                else {
                    toast.error(data.message)
                    setTreatment(null);
                    refetch()
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={date} className="input w-full input-bordered " />
                        <select name="slot" className="select select-bordered w-full">
                            {
                                slots.map((slot, i) => <option
                                    value={slot}
                                    key={i}
                                >{slot}</option>)
                            }
                        </select>
                        <input name="name" type="text" defaultValue={user?.displayName} readOnly disabled className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} readOnly disabled className="input w-full input-bordered" />
                        <input name="price" type="text" defaultValue={`$ ${price}`} readOnly disabled className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" required />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;