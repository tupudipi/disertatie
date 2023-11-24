import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Accordion, Container } from 'react-bootstrap';
import RamuriAccordion from '../../components/RamuriAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '../../components/Nav';
import Footer from '../../components/Footer';

function DomeniuPage() {
  const [domeniu, setDomeniu] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetch domeniu
    if (id) {
      fetch(`/api/domenii/${id}`)
        .then(response => response.json())
        .then(domeniuData => {
          setDomeniu(domeniuData);
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
          <h1 className='page-header display-3'>Domeniul {domeniu.nume}</h1><hr></hr>
          <h5 className='text-body-secondary'>Ramuri cuprinse în domeniul {domeniu.nume}:</h5>
          <RamuriAccordion domeniuId={domeniu.id} domeniuNume={domeniu.nume} />
        </Container>
        <hr></hr>
      </main>
      <Footer />
    </div>
  );
}

export default DomeniuPage;
