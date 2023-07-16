import React, { useEffect, useState } from 'react';
import RegistrationModal from './RegistratioModal';
import LoginModal from './LoginModal';
import { Button } from 'react-bootstrap';
import app from '../src/app/firebase';

const NavButtons = () => {
    const [user, setUser] = useState(null);

    const fetchCurrentUser = async () => {
        const response = await fetch('/api/currentUser');
        if (response.ok) {
            const data = await response.json();
            // console.log(`Current user is: ${data.user}`); 
            setUser(data.user); // update state with user data
        } else {
            // Handle error here
            // console.log('Failed to fetch current user');
            setUser(null);
        }
    };

    useEffect(() => {
        fetchCurrentUser(); // fetch the current user when the component mounts
    }, []); // empty dependency array means this effect runs once on mount and not on updates

    // console.log(`User state: ${user}`);

    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
    
        const data = await response.json();
        // alert(data.message);
    
        if(response.status === 200) {
            console.log('User logged out...');
            setUser(null);
            location.reload()
        }
    };

    if (user) {
        return (
            <div className='d-flex flex-wrap justify-content-center'>
                <div className="d-flex">
                    <div className="mx-2">
                        <Button variant="outline-primary" className="rounded-pill border-2" disabled>
                            {user.username}
                        </Button>
                    </div>
                    <div className="mx-2">
                        <Button variant="outline-danger" className="rounded-pill border-2" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='d-flex flex-wrap justify-content-center'>
                <div className="d-flex">
                    <div className="mx-2">
                        <LoginModal onLogin={fetchCurrentUser} />
                    </div>
                    <div className="mx-2">
                        <RegistrationModal onRegister={fetchCurrentUser} />
                    </div>
                </div>
            </div>
        );
    }
};

export default NavButtons;
