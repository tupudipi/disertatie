'use client';
import React, { useState, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacultatiAccordionU from '@/components/FacultatiAccordionU';

function UniversitatePage({params}) {
  const [universitate, setUniversitate] = useState({});

  useEffect(() => {
    // Fetch universitate
    if (params.id) {
      fetch(`/api/universitati/${params.id}`)
        .then(response => response.json())
        .then(universitateData => {
          setUniversitate(universitateData);
        });
    }
  }, [params.id]);

  return (
        <Container fluid="lg">
          <h1 className='page-header display-3'>{universitate.nume}</h1><hr></hr>
          <h5 className='text-body-secondary'>Facultăți cuprinse în {universitate.nume}:</h5>
          <FacultatiAccordionU universitateId={universitate.id} />
          <hr></hr>
        </Container>
  );
}

export default UniversitatePage;
