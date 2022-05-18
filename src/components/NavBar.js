import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" bg="dark" variant="dark" fixed="top">
        <Container>
  <Navbar.Brand>
      <img src={logo} alt="logo" height="45"/>
      </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto text-left">
      <Nav.Link><i className="fas fa-home"></i><br></br>Home</Nav.Link>
      <Nav.Link><i class="fa-solid fa-right-to-bracket"></i><br></br>Sign in</Nav.Link>
      <Nav.Link><i class="fa-solid fa-user-plus"></i><br></br>Sign up</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default NavBar;