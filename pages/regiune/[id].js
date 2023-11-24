import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Accordion, Container } from 'react-bootstrap';
import OraseAccordion from '../../components/OraseAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '../../components/Nav';
import Footer from '../../components/Footer';

function RegiunePage() {
  const [regiune, setRegiune] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetch regiune
    if (id) {
      fetch(`/api/regiuni/${id}`)
        .then(response => response.json())
        .then(regiuneData => {
          setRegiune(regiuneData);
        });
    }
  }, [id]);

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
          <h1 className='page-header display-3'>Regiunea {regiune.nume}</h1><hr></hr>
          <h5 className='text-body-secondary'>Orașe în regiunea {regiune.nume}:</h5>
          <OraseAccordion regiuneId={regiune.id} regiuneNume={regiune.nume} />
        </Container>
        <hr></hr>
      </main>
      <Footer />
    </div>
  );
}

export default RegiunePage;
