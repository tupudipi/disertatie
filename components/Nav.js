import React, { useEffect } from 'react';
import { Navbar, Nav, Button, Modal, Container } from 'react-bootstrap';
import NavButtons from './NavButtons';
import Image from 'next/image';

const MyNav = ({pull_user}) => {

  useEffect(() => {
    // Add any side effects you want to run when the component mounts here
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">
          <Image src="/images/icon.png" alt="icon" width={35} height={35} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="border-bottom">
          <Nav className="navbar-nav mx-auto">
            <Nav.Item>
              <Nav.Link href="/" className="text-center"><strong>Home</strong></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/chestionar" className="text-center"><strong>Chestionar</strong></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/chat" className="text-center"><strong>Consilier Digital</strong></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/domenii" className="text-center"><strong>Căutare după domeniu</strong></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/regiuni" className="text-center"><strong>Căutare după locație</strong></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/searchPage" className="text-center"><strong>Căutare avansată</strong></Nav.Link>
            </Nav.Item>

          </Nav>
          <NavButtons pull_user={pull_user}/>

        </Navbar.Collapse>
      </Container>
      <Modal id="loginModal">
        {/* Add login modal content */}
      </Modal>
      <Modal id="signupModal">
        {/* Add signup modal content */}
      </Modal>
    </Navbar>
  );
};

export default MyNav;
