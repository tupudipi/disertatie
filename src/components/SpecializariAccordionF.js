import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

function SpecializariAccordionF({ facultateId }) {
  const [specializari, setSpecializari] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/specializari');
        const specializariData = await response.json();
        const specializariForFacultate = specializariData.filter(
          (specializare) => specializare.id_facultate === facultateId
        );

        for (let specializare of specializariForFacultate) {
          const ramuraResponse = await fetch(`/api/ramuri/${specializare.id_ramura}`);
          const ramura = await ramuraResponse.json();

          const domeniuResponse = await fetch(`/api/domenii/${ramura.id_domeniu}`);
          const domeniu = await domeniuResponse.json();

          specializare.ramura = ramura;
          specializare.domeniu = domeniu;
        }

        setSpecializari(specializariForFacultate);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [facultateId]);

  return (
    <div>
      {loading ? (
        // Show placeholder list while loading
        Array.from({ length: 3 }, (_, index) => (
          <Card key={index} className="mb-1">
            <Card.Body className="bg-light">
              <Row>
                <Col lg={3} className="my-auto">
                  <h5 className="card-title">
                    <Spinner size="sm" animation="border" className='text-primary' />
                  </h5>
                </Col>
                <Col lg={4} className="bg-white">
                  <p className="my-3">
                    <Spinner size="sm" animation="border" className='text-primary' />
                  </p>
                </Col>
                <Col lg={4} className="bg-white">
                  <p className="my-3">
                    <Spinner size="sm" animation="border" className='text-primary' />
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        // Show actual list when data is loaded
        specializari.map((specializare, index) => (
          <Card key={index} className="mb-1">
            <Card.Body className="bg-light">
              <Row>
                <Col lg={3} className="my-auto">
                  <h5 className="card-title">
                    <Link
                      className="text-decoration-none w-100"
                      href={`/specializare/${specializare.id}`}
                    >
                      <small>Specializarea<br /></small> {specializare.nume}
                    </Link>
                  </h5>
                </Col>
                <Col lg={4} className="bg-white">
                  <p className="my-3">
                    <Link
                      className="text-decoration-none w-100"
                      href={`/domeniu/${specializare.domeniu.id}`}
                    >
                      <i className="bi bi-stop"></i>  Domeniul {specializare.domeniu.nume}
                    </Link>
                  </p>
                </Col>
                <Col lg={4} className="bg-white">
                  <p className="my-3">
                    <Link
                      className="text-decoration-none w-100"
                      href={`/ramura/${specializare.ramura.id}`}
                    >
                      <i className="bi bi-diagram-3"></i> Ramura {specializare.ramura.nume}
                    </Link>
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default SpecializariAccordionF;
