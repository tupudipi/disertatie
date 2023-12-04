'use client';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SpecializariAccordionF from '@/components/SpecializariAccordionF';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

function FacultatePage({ params }) {
  const [facultate, setFacultate] = useState({});
  const [universitate, setUniversitate] = useState({});
  const [oras, setOras] = useState({});

  useEffect(() => {
    // Fetch facultate
    if (params.id) {
      fetch(`/api/facultati/${params.id}`)
        .then(response => response.json())
        .then(facultateData => {
          setFacultate(facultateData);
        });
    }
  }, [params.id]);

  // Fetch universitate based on id_universitate from facultate
  useEffect(() => {
    if (facultate.id_universitate) {
      fetch(`/api/universitati/${facultate.id_universitate}`)
        .then(response => response.json())
        .then(universitateData => {
          setUniversitate(universitateData);
        });
    }
  }, [facultate.id_universitate]);

  // Fetch oras based on id_oras from facultate
  useEffect(() => {
    if (facultate.id_oras) {
      fetch(`/api/orase/${facultate.id_oras}`)
        .then(response => response.json())
        .then(orasData => {
          setOras(orasData);
        });
    }
  }, [facultate.id_oras]);

  return (
    <Container fluid="lg">
      <h1 className='page-header display-3'>{facultate.nume}</h1>
      <h4>
        <small className="text-muted">
          <Link className="text-decoration-none w-100" href={`/universitate/${facultate.id_universitate}`}>
            <i className="bi bi-house"></i> {universitate.nume}
          </Link>
        </small>
      </h4>
      <hr />
      <div className="row">
        <div className="col">
          <h5 className="mb-4">
            <Link className="text-decoration-none w-100" href={`/oras/${facultate.id_oras}`}>
              <i className="bi bi-building"></i> {oras.nume}
            </Link>
          </h5>
        </div>
      </div>
      <br />
      <h3 className='page-header text-muted'>Specializări: </h3>
      <SpecializariAccordionF facultateId={facultate.id} />
      <hr></hr>
    </Container>
  );
}

export default FacultatePage;
