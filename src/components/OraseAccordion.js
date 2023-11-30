import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UniversitatiAccordion from './UniversitatiAccordion';
import { Spinner, Accordion } from 'react-bootstrap';

function OraseAccordion({ regiuneId }) {
  const [orase, setOrase] = useState([]);
  const [activeOrasId, setActiveOrasId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('/api/orase')
      .then(response => response.json())
      .then(oraseData => {
        const oraseForRegiune = oraseData.filter(oras => oras.id_regiune === regiuneId);
        setOrase(oraseForRegiune);
        setLoading(false); // Set loading to false once data is fetched
      });
  }, [regiuneId]);

  const handleAccordionClick = (orasId) => {
    setActiveOrasId(orasId);
  };

  const placeholderItems = Array.from({ length: 4 }, (_, index) => (
    <Accordion.Item key={index} eventKey={index.toString()}>
      <Accordion.Header onClick={() => handleAccordionClick(index)}>
        <Spinner size="sm" animation="border" className='text-primary' />
      </Accordion.Header>
      <Accordion.Body>
        <Spinner size="sm" animation="border" className='text-primary' />
      </Accordion.Body>
    </Accordion.Item>
  ));

  return (
    <Accordion>
      {loading ? (
        // Show placeholder accordion while loading
        placeholderItems
      ) : (
        // Show actual accordion when data is loaded
        orase.map((oras, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header onClick={() => handleAccordionClick(oras.id)}>
              {oras.nume}
            </Accordion.Header>
            <Accordion.Body>
              {activeOrasId === oras.id && (
                <>
                  <h5 className='text-body-secondary'>Universități:</h5>
                  <UniversitatiAccordion orasId={oras.id} />
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))
      )}
    </Accordion>
  );
}

export default OraseAccordion;
