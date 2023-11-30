'use client';
import React, { useState, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import OraseAccordion from '@/components/OraseAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '@/components/Nav';
import Footer from '@/components/Footer';

function RegiunePage({params}) {
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
          <h1 className='page-header display-3'>Regiunea {regiune.nume}</h1><hr></hr>
          <h5 className='text-body-secondary'>Orașe în regiunea {regiune.nume}:</h5>
          <OraseAccordion regiuneId={regiune.id} regiuneNume={regiune.nume} />
        </Container>
        <hr></hr>
      </main>
      <Footer />
    </div>
  );
}

export default RegiunePage;
