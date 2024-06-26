'use client'

import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useAuthentication } from '@/components/context/AuthContext';
import Link from 'next/link';

export default function QuizResultsPage() {
    const { currentUser } = useAuthentication();
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetch(`/api/quizResults/email/${currentUser.email}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setResults(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else {
            setResults(null);
        }
    }, []);

    if (isLoading) {
        return (
        <div className='col-9 p-2'>
            <div className='border'>
                <p>Loading Quiz Results...</p>
            </div>
        </div>);
    }

    return (
        <div className='col-9 p-2'>
            <div className='border'>
                <p>{JSON.stringify(results)}</p>
            </div>
        </div>
    );
}