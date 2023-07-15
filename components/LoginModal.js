// components/LoginModal.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginModal = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        parola: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        alert(data.message);
        
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Log in
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log in</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Parola:</Form.Label>
                            <Form.Control type="password" name="parola" value={formData.parola} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex">
                        <Button variant="primary" type="submit" className='w-33 mx-3'>
                            Log in
                        </Button>
                        <Button variant="secondary" onClick={handleClose} className='w-33 mx-3'>
                            Închide fereastra
                        </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginModal;
