'use client';
import React, { useState, useEffect } from 'react';
import { Accordion, Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '@/components/Nav';
import Footer from '@/components/Footer';
import OraseAccordion from '@/components/OraseAccordion';

// ... (your imports)

function RegiuniPage() {
  const [regiuni, setRegiuni] = useState([]);
  const [activeRegiuneId, setActiveRegiuneId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch regiuni
    fetch('/api/regiuni')
      .then(response => response.json())
      .then(regiuniData => {
        setRegiuni(regiuniData);
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []);

  const handleAccordionClick = (regiuneId) => {
    setActiveRegiuneId(regiuneId);
  };

  const placeholderItems = Array.from({ length: 6 }, (_, index) => (
    <Accordion.Item key={index} eventKey={index.toString()}>
      <Accordion.Header onClick={() => handleAccordionClick(index)}>
        <h5><Spinner size="sm" animation="border" className='text-primary' /></h5>
      </Accordion.Header>
      <Accordion.Body>
        <Spinner size="sm" animation="border" className='text-primary' />
      </Accordion.Body>
    </Accordion.Item>
  ));

  return (
    <div>
      <MyNav />
      <main
        style={{
          paddingTop: '0px',
          position: 'relative',
          zIndex: '1',
          backgroundColor: 'white',
          marginBottom: '140px',
          paddingBottom: '10px',
        }}
      >
        <Container fluid="lg">
          <h1 className="page-header display-3">Regiuni</h1>
          <hr></hr>
          <Accordion className="mb-1">
            {loading ? (
              // Show placeholder accordion while loading
              placeholderItems
            ) : (
              // Show actual accordion when data is loaded
              regiuni.map((regiune, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header onClick={() => handleAccordionClick(regiune.id)}>
                    <h5>{regiune.nume}</h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    {activeRegiuneId === regiune.id && (
                      <>
                        <h5 className="text-body-secondary">Orașe:</h5>
                        <OraseAccordion regiuneId={regiune.id} regiuneNume={regiune.nume} />
                      </>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))
            )}
          </Accordion>
          <hr></hr>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default RegiuniPage;
