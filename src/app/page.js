'use client'
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import educationPic from '../../public/images/education.svg';
import questionnairePic from '../../public/images/chestionar.svg';
import chatbotPic from '../../public/images/chatbot.svg';
import choosePic from '../../public/images/choose.svg';
import webSearchPic from '../../public/images/web_search.svg';
import publicDiscussionPic from '../../public/images/public_discussion.svg';
import lightbulbMomentPic from '../../public/images/lightbulb_moment.svg';

export default function HomePage() {
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
                            <Image src={educationPic} alt="" className="mw-100 mh-100 mx-0 my-0" style={{ width: 'clamp(388px, 100%, 744px)', height: 'auto',}} />
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
                                    <Button variant="primary" size="lg" className="rounded-pill">Începe Chestionarul</Button>
                                </Link>
                            </Row>
                        </Col>
                        <Col className="text-center">
                            <Image src={questionnairePic} alt="" className="mw-100 mx-0 my-0" style={{ width: 'clamp(388px, 100%, 744px)', height: 'auto',}}/>
                        </Col>
                    </Row>
                </Container>

                <Container fluid className="mb-5 shadow">
                    <Row>
                        <Col lg={6} className="text-center">
                            <Image src={chatbotPic} alt="" className="mw-100 mx-0 my-0" style={{ width: 'clamp(388px, 100%, 744px)', height: 'auto',}}/>
                        </Col>
                        <Col lg className="text-center my-auto">
                            <h3 className="p-3 display-6 font-weight-bold">Apoi vorbește cu consilierul nostru educațional digital, care utilizează tehnologia AI pentru a oferi sfaturi personalizate:</h3>
                            <Link href="/chat">
                                <Button variant="outline-primary" size="lg" className="rounded-pill mb-3">
                                    Chat cu Consilierul AI
                                </Button>
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
                                        <Button variant="primary" size="lg" className="rounded-pill">Căutare după domeniu</Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link href="/regiuni">
                                        <Button variant="primary" size="lg" className="rounded-pill">Căutare după locație</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="text-center">
                            <Image src={choosePic} alt="" className="mw-100 mx-0 my-0" style={{ width: 'clamp(388px, 100%, 744px)', height: 'auto',}}/>
                        </Col>
                    </Row>
                </Container>

                <Container fluid className="mb-5 shadow">
                    <Row>
                        <Col lg={6} className="text-center">
                            <Image src={webSearchPic} alt="" className="mw-100 mx-0 my-0" style={{ width: 'clamp(388px, 100%, 744px)', height: 'auto',}}/>
                        </Col>
                        <Col lg className="text-center my-auto">
                            <h3 className="p-3 display-6 font-weight-bold">Pentru cei care vor să filtreze în detaliu opțiunile disponibile, există:</h3>
                            <Link href="/searchPage">
                                <Button variant="outline-primary" size="lg" className="rounded-pill mb-3">Căutarea avansată!</Button>
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
                            <Image src={publicDiscussionPic} alt="" className="mw-100 mx-0 my-0" style={{ width: 'clamp(388px, 100%, 744px)', height: 'auto',}}/>
                        </Col>
                    </Row>
                </Container>

                <Container fluid className="shadow">
                    <Row>
                        <Col lg={6} className="text-center">
                            <Image src={lightbulbMomentPic} alt="" className="mw-100 mx-0 my-0" style={{ width: 'clamp(388px, 100%, 744px)', height: 'auto',}}/>
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


