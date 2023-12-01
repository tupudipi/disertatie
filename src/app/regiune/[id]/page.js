'use client';
import React, { useState, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import OraseAccordion from '@/components/OraseAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegiunePage({ params }) {
  const [regiune, setRegiune] = useState({});

  useEffect(() => {
    // Fetch regiune
    if (params.id) {
      fetch(`/api/regiuni/${params.id}`)
        .then(response => response.json())
        .then(regiuneData => {
          setRegiune(regiuneData);
        });
    }
  }, [params.id]);

  return (

    <Container fluid="lg">
      <h1 className='page-header display-3'>Regiunea {regiune.nume}</h1><hr></hr>
      <h5 className='text-body-secondary'>Orașe în regiunea {regiune.nume}:</h5>
      <OraseAccordion regiuneId={regiune.id} regiuneNume={regiune.nume} />
      <hr></hr>
    </Container>
  );
}

export default RegiunePage;
