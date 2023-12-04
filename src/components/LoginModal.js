// components/LoginModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthentication } from './context/AuthContext';


const LoginModal = (props) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        parola: '',
    });
    const { login } = useAuthentication();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(formData);
        await login(formData.username, formData.parola);
        handleClose();
        window.location.reload();
    };

    return (
        <>
            <Button variant="outline-primary" className='rounded-pill btn btn-outline-primary px-4' onClick={handleShow}>
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
