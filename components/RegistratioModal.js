// components/RegistrationModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const RegistrationModal = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        nume: '',
        prenume: '',
        email: '',
        parola: '',
        parola2: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.parola !== formData.parola2) {
            alert("Passwords do not match.");
            return;
        }

        const response = await fetch('/api/register', {
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
                Sign Up
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Înregistrare</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nume:</Form.Label>
                            <Form.Control type="text" name="nume" value={formData.nume} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Prenume:</Form.Label>
                            <Form.Control type="text" name="prenume" value={formData.prenume} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>E-mail:</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Parola:</Form.Label>
                            <Form.Control type="password" name="parola" value={formData.parola} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Repetă parola:</Form.Label>
                            <Form.Control type="password" name="parola2" value={formData.parola2} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex">
                        <Button variant="primary" type="submit" className='w-33 mx-3'>
                            Înregistrează cont nou
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

export default RegistrationModal;
