import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import UniversitatiAccordion from './UniversitatiAccordion';


function OraseAccordion({ regiuneId }) {
  const [orase, setOrase] = useState([]);
  const [activeOrasId, setActiveOrasId] = useState(null);

  useEffect(() => {
    fetch('/api/orase')
      .then(response => response.json())
      .then(oraseData => {
        const oraseForRegiune = oraseData.filter(oras => oras.id_regiune === regiuneId);
        setOrase(oraseForRegiune);
      });
  }, [regiuneId]);

  const handleAccordionClick = (orasId) => {
    setActiveOrasId(orasId);
  };

  return (
    <Accordion>
      {orase.map((oras, index) => (
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
      ))}
    </Accordion>
  );
}

export default OraseAccordion;