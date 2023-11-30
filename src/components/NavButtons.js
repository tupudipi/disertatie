import React, { useEffect, useState, useCallback } from 'react';
import RegistrationModal from './RegisterModal';
import LoginModal from './LoginModal';
import { Button } from 'react-bootstrap';
import { useAuthentication } from './context/AuthContext';

const NavButtons = () => {
    const { currentUser, login, logout } = useAuthentication();

    const handleLogout = useCallback(async () => {
        await logout();
        window.location.reload();
    }, [logout]);

    return (
        <div className='d-flex flex-wrap justify-content-center pt-1'>
            <div className="d-flex">
                <div className="mx-2">
                    {currentUser ?
                        <Button variant="outline-primary" className="rounded-pill border-2" disabled>
                            {currentUser.email}
                        </Button> :
                        <LoginModal />
                    }
                </div>
                <div className="mx-2">
                    {currentUser ?
                        <Button variant="outline-danger" className="rounded-pill border-2" onClick={ handleLogout }>
                            Logout
                        </Button> :
                        <RegistrationModal />
                    }
                </div>
            </div>
        </div>
    );

};

export default NavButtons;
