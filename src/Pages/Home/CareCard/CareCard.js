import React from 'react';
import care from "../../../assets/images/treatment.png"
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const CareCard = () => {
    return (
        <div className="card lg:card-side my-32 mx-auto">
            <figure><img src={care} alt="Album" className='w-2/3 rounded-lg ml-20' /></figure>
            <div className="card-body w-1/2 justify-center my-auto">
                <h2 className="card-title text-4xl">Exceptional Dental </h2>
                <h2 className="card-title text-4xl">Care, on Your Terms </h2>
                <p className='my-10'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <div className="card-actions justify-start">
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default CareCard;