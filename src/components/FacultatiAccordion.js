import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpecializariAccordionF from './SpecializariAccordionF';
import { Spinner, Accordion } from 'react-bootstrap';

function FacultatiAccordion({ universitateId, orasId }) {
  const [facultati, setFacultati] = useState([]);
  const [activeFacultateId, setActiveFacultateId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('/api/facultati')
      .then(response => response.json())
      .then(facultatiData => {
        const facultatiForUniversitate = facultatiData.filter(facultate =>
          facultate.id_universitate === universitateId && facultate.id_oras === orasId
        );
        setFacultati(facultatiForUniversitate);
        setLoading(false); // Set loading to false once data is fetched
      });
  }, [universitateId, orasId]);

  const handleAccordionClick = (facultateId) => {
    setActiveFacultateId(facultateId);
  };

  const placeholderItems = Array.from({ length: 6 }, (_, index) => (
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
        facultati.map((facultate, index) => (
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
        ))
      )}
    </Accordion>
  );
}

export default FacultatiAccordion;
