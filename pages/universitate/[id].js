import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Accordion, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '../../components/Nav';
import Footer from '../../components/Footer';
import FacultatiAccordionU from '../../components/FacultatiAccordionU';

function UniversitatePage() {
  const [universitate, setUniversitate] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetch universitate
    if (id) {
      fetch(`/api/universitati/${id}`)
        .then(response => response.json())
        .then(universitateData => {
          setUniversitate(universitateData);
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
          <h1 className='page-header display-3'>{universitate.nume}</h1><hr></hr>
          <h5 className='text-body-secondary'>Facultăți cuprinse în {universitate.nume}:</h5>
          <FacultatiAccordionU universitateId={universitate.id} />
        </Container>
        <hr></hr>
      </main>
      <Footer />
    </div>
  );
}

export default UniversitatePage;
