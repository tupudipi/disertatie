import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacultatiAccordion from './FacultatiAccordion';
import { Spinner, Accordion } from 'react-bootstrap';

function UniversitatiAccordion({ orasId }) {
  const [universitati, setUniversitati] = useState([]);
  const [activeUniversitateId, setActiveUniversitateId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('/api/facultati')
      .then(response => response.json())
      .then(facultatiData => {
        const universitatiIds = new Set();
        facultatiData.forEach(facultate => {
          if (facultate.id_oras === orasId) {
            universitatiIds.add(facultate.id_universitate);
          }
        });
        const universitatiForOras = [];
        const requests = Array.from(universitatiIds).map(universitateId =>
          fetch(`/api/universitati/${universitateId}`)
            .then(response => response.json())
            .then(universitateData => {
              const universitate = { ...universitateData, nume: toTitleCase(universitateData.nume) };
              universitatiForOras.push(universitate);
            })
        );

        Promise.all(requests).then(() => {
          setUniversitati([...universitatiForOras]);
          setLoading(false); // Set loading to false once data is fetched
        });
      });
  }, [orasId]);

  const handleAccordionClick = (universitateId) => {
    setActiveUniversitateId(universitateId);
  };

  const toTitleCase = (str) => {
    return str.replace(/[\u00C0-\u01BF\u01CD-\u024F\w]+/gu, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const placeholderItems = Array.from({ length: 3 }, (_, index) => (
    <Accordion.Item key={index} eventKey={index.toString()}>
      <Accordion.Header>
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
        universitati.map((universitate, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header onClick={() => handleAccordionClick(universitate.id)}>
              {universitate.nume}
            </Accordion.Header>
            <Accordion.Body>
              {activeUniversitateId === universitate.id && (
                <>
                  <h5 className='text-body-secondary'>Facultăți:</h5>
                  <FacultatiAccordion universitateId={universitate.id} orasId={orasId} />
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))
      )}
    </Accordion>
  );
}

export default UniversitatiAccordion;
