import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" bg="dark" variant="dark" fixed="top">
        <Container>
            <NavLink to="/" >
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="45"/>
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto text-left">
                    <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/" ><i className="fas fa-home"></i><br></br>Home</NavLink>
                    <NavLink className={styles.NavLink} activeClassName={styles.Active}  to="/signin"><i class="fa-solid fa-right-to-bracket"></i><br></br>Sign in</NavLink>
                    <NavLink className={styles.NavLink} activeClassName={styles.Active}  to="/signup"><i class="fa-solid fa-user-plus"></i><br></br>Sign up</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar;