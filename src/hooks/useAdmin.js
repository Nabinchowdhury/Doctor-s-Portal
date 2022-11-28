import React, { useEffect, useState } from 'react';

const useAdmin = (email) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [adminLoading, setAdminLoading] = useState(true)
    // console.log(email);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("AccessToken")}`
                }
            }).then((res) => res.json())
                .then(data => {
                    setIsAdmin(data?.isAdmin)
                    setAdminLoading(false)
                })
        }

    }, [email])
    // console.log(isAdmin)

    return [isAdmin, adminLoading]
};

export default useAdmin;