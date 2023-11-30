'use client';
import React, { useState, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '@/components/Nav';
import Footer from '@/components/Footer';
import OraseAccordion from '@/components/OraseAccordion';

function RegiuniPage() {
  const [regiuni, setRegiuni] = useState([]);
  const [activeRegiuneId, setActiveRegiuneId] = useState(null);
  const [user, setUser] = useState(null);
  const pull_user = (user) => {
    setUser(user);
  }

  useEffect(() => {
    // Fetch regiuni
    fetch('/api/regiuni')
      .then(response => response.json())
      .then(regiuniData => {
        setRegiuni(regiuniData);
      });
  }, []);

  const handleAccordionClick = (regiuneId) => {
    setActiveRegiuneId(regiuneId);
  };

  return (
    <div>
      <MyNav pull_user={pull_user}/>
      <main style={{
        paddingTop: '0px',
        position: 'relative',
        zIndex: '1',
        backgroundColor: 'white',
        marginBottom: '140px',
        paddingBottom: '10px',
      }}>
        <Container fluid="lg">
          <Accordion className='mb-1'>
            <h1 className='page-header display-3'>Regiuni</h1><hr></hr>
            {regiuni.map((regiune, index) => (
              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header onClick={() => handleAccordionClick(regiune.id)}>
                  <h5>{regiune.nume}</h5>
                </Accordion.Header>
                <Accordion.Body>
                  {activeRegiuneId === regiune.id && (
                    <>
                      <h5 className='text-body-secondary'>Orașe:</h5>
                      <OraseAccordion regiuneId={regiune.id} regiuneNume={regiune.nume} />
                    </>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          <hr></hr>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default RegiuniPage;