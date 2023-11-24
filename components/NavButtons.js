import React, { useEffect, useState, useCallback } from 'react';
import RegistrationModal from './RegistratioModal';
import LoginModal from './LoginModal';
import { Button } from 'react-bootstrap';
import app from '../src/app/firebase';

const NavButtons = () => {
    const [user, setUser] = useState(null);

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch('/api/currentUser');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user); // update state with user data
            } else {
                // Handle error here
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        fetchUser(); // fetch the current user when the component mounts
    }, [fetchUser]); // Include fetchUser in the dependency array

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            if (response.status === 200) {
                console.log('User logged out...');
                setUser(null);
                location.reload();
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <div className='d-flex flex-wrap justify-content-center'>
            <div className="d-flex">
                <div className="mx-2">
                    {user ?
                        <Button variant="outline-primary" className="rounded-pill border-2" disabled>
                            {user.username}
                        </Button> :
                        <LoginModal onLogin={fetchUser} />
                    }
                </div>
                <div className="mx-2">
                    {user ?
                        <Button variant="outline-danger" className="rounded-pill border-2" onClick={handleLogout}>
                            Logout
                        </Button> :
                        <RegistrationModal onRegister={fetchUser} />
                    }
                </div>
            </div>
        </div>
    );
    // if (user) {
    //     return (
    //         <div className='d-flex flex-wrap justify-content-center'>
    //             <div className="d-flex">
    //                 <div className="mx-2">
    //                     <Button variant="outline-primary" className="rounded-pill border-2" disabled>
    //                         {user.username}
    //                     </Button>
    //                 </div>
    //                 <div className="mx-2">
    //                     <Button variant="outline-danger" className="rounded-pill border-2" onClick={handleLogout}>
    //                         Logout
    //                     </Button>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div className='d-flex flex-wrap justify-content-center'>
    //             <div className="d-flex">
    //                 <div className="mx-2">
    //                     <LoginModal onLogin={fetchUser} />
    //                 </div>
    //                 <div className="mx-2">
    //                     <RegistrationModal onRegister={fetchUser} />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
};

export default NavButtons;
