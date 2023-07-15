// components/RegistrationModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const RegistrationModal = (props) => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState([]);
    const [hasLength, setHasLength] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasSpecial, setHasSpecial] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        nume: '',
        prenume: '',
        email: '',
        parola: '',
        parola2: '',
    });

    const handleClose = () => {
        setShow(false);

        // Clear form data
        setFormData({
            username: '',
            nume: '',
            prenume: '',
            email: '',
            parola: '',
            parola2: '',
        });
        setErrors([]);
        setSuccess([]);

        // Reset password checks
        setHasLength(false);
        setHasLowercase(false);
        setHasUppercase(false);
        setHasSpecial(false);
        setHasNumber(false);
        setPasswordMatch(false);
    };
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setFormData(prevFormData => {
            const updatedFormData = { ...prevFormData, [e.target.name]: e.target.value };

            if (e.target.name === "parola") {
                validatePassword(e.target.value);
            }

            if (e.target.name === "parola" || e.target.name === "parola2") {
                setPasswordMatch(updatedFormData.parola === updatedFormData.parola2);
            }

            return updatedFormData;
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        setSuccess([]);

        let errorMessages = [];

        if (formData.parola !== formData.parola2) {
            errorMessages.push("Passwords do not match.");
        }

        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (!emailPattern.test(formData.email)) {
            errorMessages.push("Invalid email address.");
        }

        if (errorMessages.length > 0) {
            setErrors(errorMessages);
            return;
        }

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            setSuccess([data.message]);
        } else {
            const error = await response.text();
            setErrors([error]);
        }
        if(response.status === 200){
            props.onRegister();
        }
    };

    const validatePassword = (password) => {
        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
        if (re.test(password)) {
            setHasLength(true);
            setHasLowercase(true);
            setHasUppercase(true);
            setHasSpecial(true);
            setHasNumber(true);
        } else {
            setHasLength(password.length >= 8);
            setHasLowercase(/[a-z]/.test(password));
            setHasUppercase(/[A-Z]/.test(password));
            setHasSpecial(/[^A-Za-z0-9]/.test(password));
            setHasNumber(/\d/.test(password));
        }
    };

    useEffect(() => {
        setFormValid(
            formData.username.length > 0 && formData.nume.length > 0 && formData.prenume.length > 0 && formData.email.length > 0 && formData.parola.length > 0 && formData.parola2.length > 0 &&
            hasLength && hasLowercase && hasUppercase && hasSpecial && hasNumber && passwordMatch);
    }, [formData, hasLength, hasLowercase, hasUppercase, hasSpecial, hasNumber, passwordMatch]);



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
                    {errors.map((error, idx) => <Alert key={idx} variant="danger">{error}</Alert>)}
                    {success.map((message, idx) => <Alert key={idx} variant="success">{message}</Alert>)}
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

                            <ul style={{ listStyleType: 'none' }}>
                                <li style={{ color: hasLength ? 'green' : 'red' }}>
                                    {hasLength ? "✓" : "✕"} Lungimea de cel puțin 8 caractere
                                </li>
                                <li style={{ color: hasLowercase ? 'green' : 'red' }}>
                                    {hasLowercase ? "✓" : "✕"} Conține litere mici
                                </li>
                                <li style={{ color: hasUppercase ? 'green' : 'red' }}>
                                    {hasUppercase ? "✓" : "✕"} Conține litere mari
                                </li>
                                <li style={{ color: hasSpecial ? 'green' : 'red' }}>
                                    {hasSpecial ? "✓" : "✕"} Conține caractere speciale
                                </li>
                                <li style={{ color: hasNumber ? 'green' : 'red' }}>
                                    {hasNumber ? "✓" : "✕"} Conține cifre
                                </li>
                            </ul>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Repetă parola:</Form.Label>
                            <Form.Control type="password" name="parola2" value={formData.parola2} onChange={handleChange} />
                            <ul style={{ listStyleType: 'none' }}>
                                <li style={{ color: passwordMatch ? 'green' : 'red' }}>
                                    {passwordMatch ? "✓" : "✕"} Parolele se potrivesc
                                </li>
                            </ul>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex">
                            <Button variant="primary" type="submit" className='w-33 mx-3' disabled={!formValid}>
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
