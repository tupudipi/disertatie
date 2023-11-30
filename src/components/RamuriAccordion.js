import React, { useState, useEffect } from 'react';
import SpecializariAccordion from './SpecializariAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Accordion } from 'react-bootstrap';

function RamuriAccordion({ domeniuId }) {
  const [ramuri, setRamuri] = useState([]);
  const [activeRamuraId, setActiveRamuraId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('/api/ramuri')
      .then(response => response.json())
      .then(ramuriData => {
        const ramuriForDomeniu = ramuriData.filter(ramura => ramura.id_domeniu === domeniuId);
        setRamuri(ramuriForDomeniu);
        setLoading(false); // Set loading to false once data is fetched
      });
  }, [domeniuId]);

  const handleAccordionClick = (ramuraId) => {
    setActiveRamuraId(ramuraId);
  };

  const placeholderItems = Array.from({ length: 4 }, (_, index) => (
    <Accordion.Item key={index} eventKey={index.toString()}>
      <Accordion.Header onClick={() => handleAccordionClick(index)}>
        <Spinner size="sm" animation="border" className='text-primary' />
      </Accordion.Header>
      <Accordion.Body>
        <p>Content for Item {index + 1}</p>
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
        ramuri.map((ramura, index) => (
          <Accordion.Item key={index} eventKey={index.toString()} >
            <Accordion.Header onClick={() => handleAccordionClick(ramura.id)}>
              {ramura.nume}
            </Accordion.Header>
            <Accordion.Body>
              {activeRamuraId === ramura.id && (
                <>
                  <h5 className='text-body-secondary'>
                    Specializări cuprinse în ramura {ramura.nume}:
                  </h5>
                  <SpecializariAccordion ramuraId={ramura.id} />
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))
      )}
    </Accordion>
  );
}

export default RamuriAccordion;
