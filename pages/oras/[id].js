import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UniversitatiAccordion from '../../components/UniversitatiAccordion';
import MyNav from '../../components/Nav';
import Footer from '../../components/Footer';

function OrasPage() {
  const [oras, setOras] = useState({});
  const [regiune, setRegiune] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetch oras
    if (id) {
      fetch(`/api/orase/${id}`)
        .then(response => response.json())
        .then(orasData => {
          setOras(orasData);
        });
    }
  }, [id]);

  // Fetch regiune based on id_regiune from oras
  useEffect(() => {
    if (oras.id_regiune) {
      fetch(`/api/regiuni/${oras.id_regiune}`)
        .then(response => response.json())
        .then(regiuneData => {
          setRegiune(regiuneData);
        });
    }
  }, [oras.id_regiune]);

  return (
    <div>
      <MyNav pull_user={pull_user}/>
      <main style={{
        paddingTop: '0px',
        position: 'relative',
        zIndex: '1',
        backgroundColor: 'white',
        marginBottom: '140px',
        paddingBottom: '10px',
      }}>
        <Container fluid="lg">
          <h1 className='page-header display-3'><small className="text-muted">Orașul </small>{oras.nume}</h1>
          <h4>
            <small className="text-muted">
              <a className="text-decoration-none w-100" href={`/regiune/${oras.id_regiune}`}>
                <i className="bi bi-geo-alt"></i> {regiune.nume}
              </a>
            </small>
          </h4>
          <hr />
          <br />
          <h5 className='text-body-secondary'>Universități în orașul {oras.nume}:</h5>
                <UniversitatiAccordion orasId={oras.id} />
        </Container>
        <hr></hr>
      </main>
      <Footer />
    </div>
  );
}

export default OrasPage;
