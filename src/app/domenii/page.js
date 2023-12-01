'use client';
import React, { useState, useEffect } from 'react';
import { Accordion, Container, Spinner } from 'react-bootstrap';
import RamuriAccordion from '@/components/RamuriAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';

function DomeniiPage() {
  const [domenii, setDomenii] = useState([]);
  const [activeDomeniuId, setActiveDomeniuId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch domenii
    fetch('/api/domenii')
      .then(response => response.json())
      .then(domeniiData => {
        setDomenii(domeniiData);
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []);

  const handleAccordionClick = (domeniuId) => {
    setActiveDomeniuId(domeniuId);
  };

  const placeholderItems = Array.from({ length: 6 }, (_, index) => (
    <Accordion.Item key={index} eventKey={index.toString()}>
      <Accordion.Header onClick={() => handleAccordionClick(index)}>
        <h5><Spinner size="sm" animation="border" className='text-primary'/></h5>
      </Accordion.Header>
      <Accordion.Body>
        <p>Content for Item {index + 1}</p>
      </Accordion.Body>
    </Accordion.Item>
  ));

  return (
        <Container fluid="lg">
          <h1 className="page-header display-3">Domenii</h1>
          <hr></hr>
          <Accordion className="mb-2">
            {loading ? (
              // Show placeholder accordion while loading
              placeholderItems
            ) : (
              // Show actual accordion when data is loaded
              domenii.map((domeniu, index) => (
                <Accordion.Item key={index} eventKey={index.toString()} >
                  <Accordion.Header onClick={() => handleAccordionClick(domeniu.id)}>
                    <h5>{domeniu.nume}</h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    {activeDomeniuId === domeniu.id && (
                      <>
                        <h5 className="text-body-secondary">
                          Ramuri cuprinse în domeniul {domeniu.nume}:
                        </h5>
                        <RamuriAccordion domeniuId={domeniu.id} domeniuNume={domeniu.nume} />
                      </>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))
            )}
          </Accordion>
          <hr></hr>
        </Container>
  );
}

export default DomeniiPage;
