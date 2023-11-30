import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import SpecializariAccordion from './SpecializariAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';

function RamuriAccordion({ domeniuId }) {
  const [ramuri, setRamuri] = useState([]);
  const [activeRamuraId, setActiveRamuraId] = useState(null);

  useEffect(() => {
    fetch('/api/ramuri')
      .then(response => response.json())
      .then(ramuriData => {
        const ramuriForDomeniu = ramuriData.filter(ramura => ramura.id_domeniu === domeniuId);
        setRamuri(ramuriForDomeniu);
      });
  }, [domeniuId]);

  const handleAccordionClick = (ramuraId) => {
    setActiveRamuraId(ramuraId);
  };

  return (
    <Accordion>
      {ramuri.map((ramura, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header onClick={() => handleAccordionClick(ramura.id)}>
            {ramura.nume}
          </Accordion.Header>
          <Accordion.Body>
            {activeRamuraId === ramura.id && (
              <>
                <h5 className='text-body-secondary'>Specializări cuprinse în ramura {ramura.nume}:</h5>
                <SpecializariAccordion ramuraId={ramura.id} />
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default RamuriAccordion;
