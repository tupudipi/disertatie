'use client'

import React, { useState, useEffect } from 'react';
import { useAuthentication } from './context/AuthContext';

// Recursive Comment component
const Comment = ({ comment, onReplySubmit }) => {
    const [newReply, setNewReply] = useState("");
    const [isReplying, setIsReplying] = useState(false);
    const { currentUser } = useAuthentication();

    const handleReplySubmit = async (event) => {
        event.preventDefault();
        const newReplyData = await onReplySubmit(comment.id, newReply);
        if (newReplyData) {
            comment.replies.push(newReplyData);
            setNewReply("");
            setIsReplying(false); // Hide the reply box after submitting
        }
    };

    const handleReplyClick = () => {
        setIsReplying(true); // Show the reply box when Reply is clicked
    };


    return (
        <div className={`card my-3 ${comment.parent_id !== 0 ? "ml-5 shadow-sm" : "shadow"}`}>
            <div className="card-body">
                <h5 className="card-title">{comment.author}</h5>
                <p className="card-text">{comment.content}</p>
                {currentUser && !isReplying && (
                    <button onClick={handleReplyClick} className="mt-1 btn btn-outline-primary">
                        Răspunde
                    </button>
                )}
                {currentUser && isReplying ? (
                    <form onSubmit={handleReplySubmit}>
                        <textarea
                            name="reply_content"
                            className="form-control"
                            style={{ height: '50px' }}
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                        />
                        <button type="submit" name="create_reply" className="mt-1 btn btn-outline-primary">
                            Trimite Răspuns
                        </button>
                    </form>
                ) : null}
                {comment.replies.map(reply => (
                    <Comment key={reply.id} comment={reply} onReplySubmit={onReplySubmit} />
                ))}
            </div>
        </div>
    );
};



function arrangeCommentsInTree(comments) {
    // Group comments by parent_id
    const commentGroups = comments.reduce((groups, comment) => {
        const { parent_id } = comment;
        if (!groups[parent_id]) {
            groups[parent_id] = [];
        }
        groups[parent_id].push(comment);
        return groups;
    }, {});

    // Add replies property to each comment
    comments.forEach(comment => {
        comment.replies = commentGroups[comment.id] || [];
    });

    // Return only top-level comments (i.e., comments without a parent)
    return commentGroups[0] || [];
}


const CommentSection = ({ pageId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { currentUser } = useAuthentication();

    useEffect(() => {
        if (pageId) {
            fetch(`/api/comments/specID/${pageId}`)
                .then(response => response.json())
                .then(data => {
                    const commentTree = arrangeCommentsInTree(data);
                    // console.log("Comment data:", commentTree);
                    setComments(commentTree);
                });
        }
    }, [pageId]);


    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        // console.log(`Submitting comment: ${newComment}`);
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pageId: parseInt(pageId), author: currentUser.email, content: newComment }),
        });
        console.log(response);
        if (!response.ok) {
            console.error(`Error posting comment: ${response.status} ${response.statusText}`);
            return;
        }
        const newCommentData = await response.json();
        if (!newCommentData || !newCommentData.id) {
            console.error(`Invalid response when posting comment: ${JSON.stringify(newCommentData)}`);
            return;
        }
        newCommentData.replies = [];
        setComments([newCommentData, ...comments]);
        setNewComment("");
    };

    const handleReplySubmit = async (parentId, replyContent) => {
        if (!parentId) {
            console.error(`Invalid parent ID when submitting reply: ${parentId}`);
            return;
        }
        // console.log(`Submitting reply to comment ${parentId}: ${replyContent}`);
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pageId, author: currentUser.email, content: replyContent, parent_id: parentId }),
        });
        if (!response.ok) {
            console.error(`Error posting reply: ${response.status} ${response.statusText}`);
            return;
        }
        const newReplyData = await response.json();
        if (!newReplyData || !newReplyData.id) {
            console.error(`Invalid response when posting reply: ${JSON.stringify(newReplyData)}`);
            return;
        }
        newReplyData.replies = [];
        return newReplyData;
    };
    return (
        <div>
            {/* Comment form */}
            <div className="card-body bg-light p-3 border border-light rounded">
                <h4>{currentUser ? 'Spune părerea ta: ' : 'Doar utilizatorii înregistrați pot lăsa comentarii.'}</h4>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        name="comment_content"
                        className="form-control"
                        style={{ height: '100px' }}
                        disabled={!currentUser}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit" name="create_comment" className="mt-1 btn btn-outline-primary" disabled={!currentUser} >
                        Postează Comentariu
                    </button>
                </form>
            </div>

            {/* Comments list */}
            <div className='py-3'>
                {comments.length > 0 ? (
                    <>
                        <h5>Ce spun ceilalți:</h5>
                        {comments.map(comment => (
                            <Comment key={comment.id} comment={comment} onReplySubmit={handleReplySubmit} />
                        ))}
                    </>
                ) : (
                    <p>Se pare că până acum nimeni nu a spus nimic despre această specializare. Fii tu primul și lasă o părere sau o întrebare!</p>
                )}
            </div>
        </div>
    );
}

export default CommentSection;
