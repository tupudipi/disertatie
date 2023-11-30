'use client';
import React, { useState, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '@/components/Nav';
import Footer from '@/components/Footer';
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
          <h1 className='page-header display-3'>{universitate.nume}</h1><hr></hr>
          <h5 className='text-body-secondary'>Facultăți cuprinse în {universitate.nume}:</h5>
          <FacultatiAccordionU universitateId={universitate.id} />
        </Container>
        <hr></hr>
      </main>
      <Footer />
    </div>
  );
}

export default UniversitatePage;
