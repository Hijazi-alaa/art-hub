import React from "react";
import  Nav  from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const {expanded, setExpanded, ref} = useClickOutsideToggle();
  
    const handleSignOut = async () => {
        await axios.post("dj-rest-auth/logout/");
        setCurrentUser(null);
        removeTokenTimestamp();

    };

    const addPostIcon = (
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/posts/create"
        >
          <i className="fa-solid fa-circle-plus"></i>Add post
        </NavLink>
      );
    
      const loggedInLinks = (
        <>
        <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/" ><i className="fas fa-home"></i>Home</NavLink>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/liked"
          >
            <i className="fa-solid fa-heart-circle-check"></i>Liked
          </NavLink>
          <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt"></i>Sign out
          </NavLink>
          <NavLink
            className={styles.NavLink}
            to={`/profiles/${currentUser?.profile_id}`}
          >
            <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
          </NavLink>
        </>
      );

    const loggedOutLinks = (
    <>
    <NavLink className={styles.NavLink} activeClassName={styles.Active}  to="/signin"><i className="fa-solid fa-right-to-bracket"></i><br></br>Sign in</NavLink>
    <NavLink className={styles.NavLink} activeClassName={styles.Active}  to="/signup"><i className="fa-solid fa-user-plus"></i><br></br>Sign up</NavLink>
    </>
    );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" bg="dark" variant="dark" fixed="top">
        <Container>
            <NavLink to="/" >
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="45"/>
                </Navbar.Brand>
            </NavLink>
            {currentUser && addPostIcon}
            <Navbar.Toggle ref={ref}
            onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    
                    {currentUser ? loggedInLinks : loggedOutLinks }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar;