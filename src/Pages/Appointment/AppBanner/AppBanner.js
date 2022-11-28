import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import chair from '../../../assets/images/chair.png';
const AppBanner = ({ selectedDate, setSelectedDate }) => {

    return (

        <div className="hero bg" >
            <div className="hero-content flex-col lg:flex-row-reverse " >
                <img src={chair} className="rounded-lg lg:w-1/2 shadow-2xl" alt='' />
                <div className='lg:w-1/2'>
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                    />
                    <p>You have selected {format(selectedDate, "PP")}</p>

                </div>
            </div>
        </div >

    );
};

export default AppBanner;