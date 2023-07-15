import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpecializariAccordion from '../../components/SpecializariAccordion';
import MyNav from '../../components/Nav';
import Footer from '../../components/Footer';

function RamuraPage() {
    const [ramura, setRamura] = useState({});
    const [domeniu, setDomeniu] = useState({});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        // Fetch ramura
        if (id) {
            fetch(`/api/ramuri/${id}`)
                .then(response => response.json())
                .then(ramuraData => {
                    setRamura(ramuraData);
                });
        }
    }, [id]);

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
        <div>
            <MyNav />
            <main style={{
                paddingTop: '0px',
                position: 'relative',
                zIndex: '1',
                backgroundColor: 'white',
                marginBottom: '140px',
                paddingBottom: '10px',
            }}>
                <Container fluid="lg">
                    <h1 className='page-header display-3'><small className="text-muted">Ramura</small> {ramura.nume}</h1>
                    <h5>
                        <a className='text-decoration-none w-100' href={`/domeniu/${ramura.id_domeniu}`}>
                            <i className="bi bi-stop"></i> Domeniul {domeniu.nume}
                        </a>
                    </h5>
                    <hr />
                    <br />
                    <h5 className='text-body-secondary'>Specializări cuprinse în ramura {ramura.nume}:</h5>
                    <SpecializariAccordion ramuraId={ramura.id} />

                </Container>
                <hr></hr>
            </main>
            <Footer />
        </div>
    );
}

export default RamuraPage;
