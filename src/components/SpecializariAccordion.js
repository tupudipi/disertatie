import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpecializariItem from './SpecializariItem';
import { Accordion, Spinner } from 'react-bootstrap';

function SpecializariAccordion({ ramuraId }) {
  const [specializari, setSpecializari] = useState([]);
  const [activeSpecializareName, setActiveSpecializareName] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('/api/specializari')
      .then(response => response.json())
      .then(specializariData => {
        const specializariForRamura = specializariData.filter(
          specializare => specializare.id_ramura === ramuraId
        );

        // Create a map of specializari grouped by their name
        const groupedSpecializari = specializariForRamura.reduce((grouped, specializare) => {
          (grouped[specializare.nume] = grouped[specializare.nume] || []).push(specializare);
          return grouped;
        }, {});

        setSpecializari(groupedSpecializari);
        setLoading(false); // Set loading to false once data is fetched
      });
  }, [ramuraId]);

  const handleAccordionClick = specializareName => {
    setActiveSpecializareName(specializareName);
  };

  const placeholderItems = Array.from({ length: 6 }, (_, index) => (
    <Accordion.Item key={index} eventKey={index.toString()}>
      <Accordion.Header onClick={() => handleAccordionClick(`Item ${index + 1}`)}>
        <Spinner size="sm" animation="border" className='text-primary' />
      </Accordion.Header>
      <Accordion.Body>
        <p>Content for Item {index + 1}</p>
      </Accordion.Body>
    </Accordion.Item>
  ));

  return (
    <div >
      <Accordion>
        {loading ? (
          // Show placeholder accordion while loading
          placeholderItems
        ) : (
          // Show actual accordion when data is loaded
          Object.entries(specializari).map(([nume, specializariForNume], index) => (
            <Accordion.Item key={index} eventKey={index.toString()} >
              <Accordion.Header onClick={() => handleAccordionClick(nume)}>
                {nume}
              </Accordion.Header>
              <Accordion.Body>
                {activeSpecializareName === nume &&
                  specializariForNume.map(specializare => (
                    <SpecializariItem key={specializare.id} specializare={specializare} />
                  ))}
              </Accordion.Body>
            </Accordion.Item>
          ))
        )}
      </Accordion>
    </div>
  );
}

export default SpecializariAccordion;
