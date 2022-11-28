import React, { useState } from 'react';
import AppBanner from '../AppBanner/AppBanner';

import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
            <AppBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AppBanner>
            <AvailableAppointments
                selectedDate={selectedDate}
            ></AvailableAppointments>
        </div>
    );
};

export default Appointment;