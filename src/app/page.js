// pages/HomePage.js
'use client'
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
    return (
        <div>
            <Nav />
            <main style={{
                paddingTop: '0px',
                position: 'relative',
                zIndex: '1',
                marginBottom: '140px',
                backgroundColor: 'white',
                minHeight: '100vh'
            }}>
                <Container fluid className="mb-5 shadow pt-5">
                    <Row>
                        <Col lg={6} className="text-center">
                            <Image src="/images/education.svg" alt="" className="mw-100" />
                        </Col>
                        <Col lg className="text-center my-auto">
                            <h3 className="p-3 display-6">Cauți un program de studii de licență potrivit exact preferințelor tale?</h3>
                            <h3 className="p-3 display-5 font-weight-bold">Ai ajuns unde trebuie!</h3>
                        </Col>
                    </Row>
                </Container>

                <Container fluid className="mb-5 shadow">
                    <Row>
                        <Col lg={6} className="text-center my-auto">
                            <h3 className="p-3 display-6 font-weight-bold">Dacă nu ești sigur ce opțiuni ți se potrivesc cel mai bine, încearcă chestionarul nostru orientativ.</h3>
                            <Row className="mt-3 mb-4 justify-content-center">
                            <Link href="/chestionar">
                                  <a>
                                        <Button variant="primary" size="lg" className="rounded-pill">Începe Chestionarul</Button>
                                  </a>
                            </Link>
                            </Row>
                        </Col>
                        <Col className="text-center">
                            <Image src="/images/chestionar.svg" alt="Questionnaire Illustration" className="mw-100" />
                        </Col>
                    </Row>
                </Container>

                <Container fluid className="mb-5 shadow">
                    <Row>
                        <Col lg={6} className="text-center">
                            <Image src="/images/chatbot.svg" alt="AI Chat Illustration" className="mw-100" />
                        </Col>
                        <Col lg className="text-center my-auto">
                            <h3 className="p-3 display-6 font-weight-bold">Apoi vorbește cu consilierul nostru educațional digital, care utilizează tehnologia AI pentru a oferi sfaturi personalizate:</h3>
                            <Link href="/chat">
                              <a>
                                <Button variant="outline-primary" size="lg" className="rounded-pill mb-3">
                                  Chat cu Consilierul AI
                                </Button>
                              </a>
                            </Link>
                        </Col>
                    </Row>
                </Container>


                <Container fluid className="mb-5 shadow">
                    <Row>
                        <Col lg={6} className="text-center my-auto">
                            <h3 className="p-3 display-6 font-weight-bold">Fie că știi deja ce vrei să studiezi și vrei să afli unde poți găsi așa ceva, fie că știi unde vrei să te duci și vrei să afli ce poți studia acolo, aici vei găsi imediat ceea ce cauți folosind una din cele două căutări simple!</h3>
                            <Row className="mt-3 mb-4">
                                <Col>
                                    <Link href="/domenii">
                                        <a><Button variant="primary" size="lg" className="rounded-pill">Căutare după domeniu</Button></a>
                                    </Link href="/regiuni">
                                </Col>
                                <Col>
                                    <Link href="/regiuni">
                                        <a><Button variant="primary" size="lg" className="rounded-pill">Căutare după locație</Button></a>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="text-center">
                            <Image src="/images/choose.svg" alt="" className="mw-100" />
                        </Col>
                    </Row>
                </Container>

                <Container fluid className="mb-5 shadow">
                    <Row>
                        <Col lg={6} className="text-center">
                            <Image src="/images/web_search.svg" alt="" className="mw-100" />
                        </Col>
                        <Col lg className="text-center my-auto">
                            <h3 className="p-3 display-6 font-weight-bold">Pentru cei care vor să filtreze în detaliu opțiunile disponibile, există:</h3>
                            <Link href="/searchPage">
                                <a><Button variant="outline-primary" size="lg" className="rounded-pill mb-3">Căutarea avansată!</Button></a>
                            </Link>
                        </Col>
                    </Row>
                </Container>

                <Container fluid className="mb-5 shadow">
                    <Row>
                        <Col lg={6} className="text-center my-auto">
                            <h3 className="p-3 display-6">Dacă ai găsit o specializare interesantă dar încă nu ești 100% sigur, poți consulta părerile lăsate de alți utilizatori în comentarii.</h3>
                            <h3 className="p-3 display-6">În cazul în care nu găsești informația de care ai nevoie, <a href="#">înregistrează-te</a> și lasă o întrebare.</h3>
                        </Col>
                        <Col lg className="text-center">
                            <Image src="/images/public_discussion.svg" alt="" className="mw-100" />
                        </Col>
                    </Row>
                </Container>

                <Container fluid className="shadow">
                    <Row>
                        <Col lg={6} className="text-center">
                            <Image src="/images/lightbulb_moment.svg" alt="" className="mw-100" />
                        </Col>
                        <Col lg className="text-center my-auto">
                            <h3 className="p-3 display-3 font-weight-bold">Începe căutarea și găsește-ți locul potrivit!</h3>
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
