'use client';
import React, { useState, useEffect } from 'react';
import { Container, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UniversitatiAccordion from '@/components/UniversitatiAccordion';
import Link from 'next/link';

function OrasPage({ params }) {
  const [oras, setOras] = useState({});
  const [regiune, setRegiune] = useState({});

  useEffect(() => {
    // Fetch oras
    if (params.id) {
      fetch(`/api/orase/${params.id}`)
        .then(response => response.json())
        .then(orasData => {
          setOras(orasData);
        });
    }
  }, [params.id]);

  // Fetch regiune based on id_regiune from oras
  useEffect(() => {
    if (oras.id_regiune) {
      fetch(`/api/regiuni/${oras.id_regiune}`)
        .then(response => response.json())
        .then(regiuneData => {
          setRegiune(regiuneData);
        });
    }
  }, [oras.id_regiune]);

  return (
    <Container fluid="lg">
      <h1 className='page-header display-3'><small className="text-muted">Orașul </small>{oras.nume}</h1>
      <h4>
        <small className="text-muted">
          <Link className="text-decoration-none w-100" href={`/regiune/${oras.id_regiune}`}>
            <i className="bi bi-geo-alt"></i> {regiune.nume}
          </Link>
        </small>
      </h4>
      <hr />
      <br />
      <h5 className='text-body-secondary'>Universități în orașul {oras.nume}:</h5>
      <UniversitatiAccordion orasId={oras.id} />
      <hr></hr>
    </Container>
  );
}

export default OrasPage;
