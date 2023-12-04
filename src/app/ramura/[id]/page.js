'use client'
import React, { useState, useEffect } from 'react';
import { Container, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpecializariAccordion from '@/components/SpecializariAccordion';
import Link from 'next/link';

function RamuraPage({ params }) {
    const [ramura, setRamura] = useState({});
    const [domeniu, setDomeniu] = useState({});

    useEffect(() => {
        // Fetch ramura
        if (params.id) {
            fetch(`/api/ramuri/${params.id}`)
                .then(response => response.json())
                .then(ramuraData => {
                    setRamura(ramuraData);
                });
        }
    }, [params.id]);

    // Fetch domeniu based on id_domeniu from ramura
    useEffect(() => {
        if (ramura.id_domeniu) {
            fetch(`/api/domenii/${ramura.id_domeniu}`)
                .then(response => response.json())
                .then(domeniuData => {
                    setDomeniu(domeniuData);
                });
        }
    }, [ramura.id_domeniu]);

    return (

        <Container fluid="lg">
            <h1 className='page-header display-3'><small className="text-muted">Ramura</small> {ramura.nume}</h1>
            <h5>
                <Link className='text-decoration-none w-100' href={`/domeniu/${ramura.id_domeniu}`}>
                    <i className="bi bi-stop"></i> Domeniul {domeniu.nume}
                </Link>
            </h5>
            <hr />
            <br />
            <h5 className='text-body-secondary'>Specializări cuprinse în ramura {ramura.nume}:</h5>
            <SpecializariAccordion ramuraId={ramura.id} />
            <hr></hr>
        </Container>
    );
}

export default RamuraPage;
