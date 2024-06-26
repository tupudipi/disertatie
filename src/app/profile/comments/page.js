'use client';

import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useAuthentication } from '@/components/context/AuthContext';
import Link from 'next/link';

export default function CommentsPage() {
    const { currentUser } = useAuthentication();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCommentsAndSpecializari = async () => {
            if (currentUser) {
                setIsLoading(true);
                try {
                    const response = await fetch(`/api/comments/email/${currentUser.email}`);
                    const data = await response.json();
                    const specializareRequests = data.map(comment => 
                        fetch(`/api/specializari/${comment.page_id}`).then(res => res.json())
                    );
                    const specializari = await Promise.all(specializareRequests);
                    const commentsWithSpecializari = data.map((comment, index) => ({
                        ...comment,
                        specializareName: specializari[index].nume,
                    }));
                    setComments(commentsWithSpecializari);
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchCommentsAndSpecializari();
    }, [currentUser]);

    if (isLoading) {
        return (
            <div className='col-9 p-2'>
                <div className='border'>
                    <p>Loading Comments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='col-9 p-2'>
            <div>
                {comments.map((comment) => {
                    const formattedDate = new Date(comment.date).toLocaleDateString("en-UK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    return (
                        <div key={comment.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link href={`../specializare/${comment.page_id}`} className="card-link">
                                        {comment.specializareName}
                                    </Link>
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">{formattedDate}</h6>
                                <p className="card-text"><em>{comment.content}</em></p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
