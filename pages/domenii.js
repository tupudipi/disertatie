import React, { useState, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import RamuriAccordion from '../components/RamuriAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '../components/Nav';
import Footer from '../components/Footer';

function DomeniiPage() {
  const [domenii, setDomenii] = useState([]);
  const [activeDomeniuId, setActiveDomeniuId] = useState(null);
  const [user, setUser] = useState(null);

  const pull_user = (user) => {
    setUser(user);
  }

  useEffect(() => {
    // Fetch domenii
    fetch('/api/domenii')
      .then(response => response.json())
      .then(domeniiData => {
        setDomenii(domeniiData);
      });
  }, []);

  const handleAccordionClick = (domeniuId) => {
    setActiveDomeniuId(domeniuId);
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
        <Accordion className='mb-2'>
          <h1 className='page-header display-3'>Domenii</h1><hr></hr>
          {domenii.map((domeniu, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header onClick={() => handleAccordionClick(domeniu.id)}>
                <h5>{domeniu.nume}</h5>
              </Accordion.Header>
              <Accordion.Body>
                {activeDomeniuId === domeniu.id && (
                  <>
                    <h5 className='text-body-secondary'>Ramuri cuprinse în domeniul {domeniu.nume}:</h5>
                    <RamuriAccordion domeniuId={domeniu.id} domeniuNume={domeniu.nume} />
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

export default DomeniiPage;
