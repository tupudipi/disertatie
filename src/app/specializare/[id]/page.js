'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '@/components/Nav';
import Footer from '@/components/Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CommentSection from '@/components/CommentSection';
import { AuthenticationProvider } from '@/components/context/AuthContext';


function SpecializarePage({params}) {
  const [specializare, setSpecializare] = useState({});
  const [facultate, setFacultate] = useState({});
  const [universitate, setUniversitate] = useState({});
  const [ramura, setRamura] = useState({});
  const [domeniu, setDomeniu] = useState({});
  const [oras, setOras] = useState({});
  const [regiune, setRegiune] = useState({});

  useEffect(() => {
    // Fetch specializare
    if (params.id) {
      fetch(`/api/specializari/${params.id}`)
        .then(response => response.json())
        .then(data => {
          setSpecializare(data);
        });
    }
  }, [params.id]);

    useEffect(() => {   
        if (specializare.id_facultate) {
            fetch(`/api/facultati/${specializare.id_facultate}`)
                .then(response => response.json())
                .then(data => {
                    setFacultate(data);
                });
        }
    }, [specializare.id_facultate]);

    useEffect(() => {
        if (facultate.id_universitate) {
            fetch(`/api/universitati/${facultate.id_universitate}`)
                .then(response => response.json())
                .then(data => {
                    setUniversitate(data);
                });
        }
    }, [facultate.id_universitate]);

    useEffect(() => {
        if (specializare.id_ramura) {
            fetch(`/api/ramuri/${specializare.id_ramura}`)
                .then(response => response.json())
                .then(data => {
                    setRamura(data);
                });
        }
    }, [specializare.id_ramura]);

    useEffect(() => {
        if (ramura.id_domeniu) {    
            fetch(`/api/domenii/${ramura.id_domeniu}`)
                .then(response => response.json())
                .then(data => {
                    setDomeniu(data);
                });
        }
    }, [ramura.id_domeniu]);

    useEffect(() => {
        if (facultate.id_oras) {
            fetch(`/api/orase/${facultate.id_oras}`)
                .then(response => response.json())
                .then(data => {
                    setOras(data);
                });
        }
    }, [facultate.id_oras]);

    useEffect(() => {
        if (oras.id_regiune) {  
            fetch(`/api/regiuni/${oras.id_regiune}`)
                .then(response => response.json())
                .then(data => {
                    setRegiune(data);
                });
        }
    }, [oras.id_regiune]);


  return (
    <div>
      <MyNav/>
      <main style={{
        paddingTop: '0px',
        position: 'relative',
        zIndex: '1',
        backgroundColor: 'white',
        marginBottom: '140px',
        paddingBottom: '10px',
      }}>
        <Container fluid="lg">
          <h1 className='page-header display-3'>
            <small className="text-muted">Specializarea </small>
            {specializare.nume}
          </h1>
          <h4>
            <small className="text-muted">
              <a className="text-decoration-none w-100" href={`/facultate/${specializare.id_facultate}`}>
                <i className="bi bi-award"></i> {facultate.nume}
              </a>
            </small><br/>
            <small className="text-muted">
              <a className="text-decoration-none w-100" href={`/universitate/${facultate.id_universitate}`}>
                <i className="bi bi-house"></i> {universitate.nume}
              </a>
            </small>
          </h4>
          <hr />
          <div className="row">
            <div className="col text-center">
              <h5 className="mt-4 mb-2">
                <a className="text-decoration-none w-100" href={`/domeniu/${ramura.id_domeniu}`}>
                  <i className="bi bi-stop"></i> Domeniul {domeniu.nume}
                </a>
              </h5>
              <h5 className="mb-4">
                <a className="text-decoration-none w-100" href={`/ramura/${specializare.id_ramura}`}>
                  <i className="bi bi-diagram-3"></i> Ramura {ramura.nume}
                </a>
              </h5>
            </div>
            <div className="col text-center">
              <h5 className="mt-4 mb-2">
                <a className="text-decoration-none w-100" href={`/regiune/${oras.id_regiune}`}>
                  <i className="bi bi-geo-alt"></i> {regiune.nume}
                </a>
              </h5>
              <h5 className="mb-4">
                <a className="text-decoration-none w-100" href={`/oras/${facultate.id_oras}`}>
                  <i className="bi bi-building"></i> {oras.nume}
                </a>
              </h5>
            </div>
          </div>
        </Container>
        <hr/>
        <Container fluid="lg">
          <AuthenticationProvider>
            <CommentSection pageId={params.id}/>
          </AuthenticationProvider>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default SpecializarePage;
