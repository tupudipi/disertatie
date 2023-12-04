'use client'
import React, { useState, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import RamuriAccordion from '@/components/RamuriAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';

function DomeniuPage({ params }) {
  const [domeniu, setDomeniu] = useState({});
  //console.log("params.id:", params.id);

  useEffect(() => {
    // Fetch domeniu
    if (params.id) {
      fetch(`/api/domenii/${params.id}`)
        .then(response => response.json())
        .then(domeniuData => {
          setDomeniu(domeniuData);
        });
    }
  }, [params.id]);

  return (
    <Container fluid="lg">
      <h1 className='page-header display-3'>Domeniul {domeniu.nume}</h1><hr></hr>
      <h5 className='text-body-secondary'>Ramuri cuprinse în domeniul {domeniu.nume}:</h5>
      <RamuriAccordion domeniuId={domeniu.id} domeniuNume={domeniu.nume} />
      <hr></hr>
    </Container>
  );
}

export default DomeniuPage;
