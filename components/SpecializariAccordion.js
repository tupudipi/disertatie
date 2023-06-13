import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpecializariItem from './SpecializariItem';

function SpecializariAccordion({ ramuraId }) {
  const [specializari, setSpecializari] = useState([]);
  const [activeSpecializareName, setActiveSpecializareName] = useState(null);

  useEffect(() => {
    fetch('/api/specializari')
      .then(response => response.json())
      .then(specializariData => {
        const specializariForRamura = specializariData.filter(specializare => specializare.id_ramura === ramuraId);

        // Create a map of specializari grouped by their name
        const groupedSpecializari = specializariForRamura.reduce((grouped, specializare) => {
          (grouped[specializare.nume] = grouped[specializare.nume] || []).push(specializare);
          return grouped;
        }, {});

        setSpecializari(groupedSpecializari);
      });
  }, [ramuraId]);

  const handleAccordionClick = (specializareName) => {
    setActiveSpecializareName(specializareName);
  };

  return (
    <div>
      <Accordion>
        {Object.entries(specializari).map(([nume, specializariForNume], index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header onClick={() => handleAccordionClick(nume)}>
              {nume}
            </Accordion.Header>
            <Accordion.Body>
              {activeSpecializareName === nume && (
                specializariForNume.map(specializare => (
                  <SpecializariItem key={specializare.id} specializare={specializare} />
                ))
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default SpecializariAccordion;
