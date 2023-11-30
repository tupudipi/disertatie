import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpecializariAccordionF from './SpecializariAccordionF';

function FacultatiAccordionU({ universitateId }) {
  const [facultati, setFacultati] = useState([]);
  const [activeFacultateId, setActiveFacultateId] = useState(null);

  useEffect(() => {
    fetch('/api/facultati')
      .then(response => response.json())
      .then(facultatiData => {
        const facultatiForUniversitate = facultatiData.filter(facultate =>
          facultate.id_universitate === universitateId
        );
        setFacultati(facultatiForUniversitate);
      });
  }, [universitateId]);

  const handleAccordionClick = (facultateId) => {
    setActiveFacultateId(facultateId);
  };

  return (
    <Accordion>
      {facultati.map((facultate, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header onClick={() => handleAccordionClick(facultate.id)}>
            {facultate.nume}
          </Accordion.Header>
          <Accordion.Body>
            {activeFacultateId === facultate.id && (
              <>
                <h5 className='text-body-secondary'>Specializări:</h5>
                <SpecializariAccordionF facultateId={facultate.id} />
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default FacultatiAccordionU;