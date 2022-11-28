import React from 'react';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import appointment from "../../../assets/images/appointment.png"
const ContactUs = () => {
    return (
        <div className='py-10' style={{
            background: `url(${appointment})`
        }}>
            <div className='text-center'>
                <h5 className='text-secondary text-xl font-semibold'>Contact Us</h5>
                <h2 className='text-white text-3xl font-semibold'>Stay connected with us</h2>
            </div>
            <div className="hero ">
                <div className="hero-content flex-col w-full">

                    <div className="card flex-shrink-0 w-full  bg-transparent">
                        <div className="card-body md:w-1/2 mx-auto">
                            <div className="form-control">

                                <input type="text" placeholder="Email Address" className="input " />
                            </div>

                            <div className="form-control mt-2">

                                <input type="text" placeholder="Subject" className="input " />
                            </div>

                            <div className="form-control mt-2">

                                <textarea className="textarea text-md font-medium " placeholder="Your message"></textarea>
                            </div>

                        </div>

                    </div>
                    <div className="form-control mt-2 ">
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;