import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import AuthProvider, { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext)
    const error = useRouteError()
    const handleLogOut = () => {
        logOut()
    }
    return (
        <div>
            <h3 className="text-2xl text-red-600">Ops! Something Wrong.</h3>
            <p>{error.status || error.message}</p>
            <h2><button className='btn btn-error' onClick={() => handleLogOut()}>Logout</button></h2>
        </div>
    );
};

export default DisplayError;