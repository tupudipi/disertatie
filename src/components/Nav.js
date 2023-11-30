import React, { useEffect } from 'react';
import { Navbar, Nav, Button, Modal, Container } from 'react-bootstrap';
import NavButtons from './NavButtons';
import Image from 'next/image';
import { AuthenticationProvider } from './context/AuthContext';

const MyNav = () => {

  return (
    <Navbar bg="light" expand="lg" className="sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">
          <Image src="/images/icon.png" alt="icon" width={35} height={35} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" >
          <Nav className="navbar-nav mx-auto border-bottom">
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
              <Nav.Link href="/search" className="text-center"><strong>Căutare avansată</strong></Nav.Link>
            </Nav.Item>

          </Nav>

          <AuthenticationProvider>
            <NavButtons />
          </AuthenticationProvider>

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
