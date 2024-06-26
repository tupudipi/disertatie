'use client'

import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useAuthentication } from '@/components/context/AuthContext';
import Link from 'next/link';

export default function Profile() {
    const { currentUser } = useAuthentication();


    return (
        <div className='col-9 p-2'>
            <div className='border'>
                <p>Hi, {JSON.stringify(currentUser.email)}!</p>
            </div>
        </div>
    );
}