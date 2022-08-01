import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';


import styled from "styled-components";

const Navbar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <NavbarContainer>
            <nav>

                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <Link className="button button-3 left" style={{ margin: '20px' }} to="/me">
                                {Auth.getProfile().data.username}'s profile
                            </Link>
                            <button className="button-3 right"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation" onClick={logout} role="button" style={{ marginRight: "40px" }}>
                                Logout
                            </button>
                            <span className="navbar-toggler-icon"></span>

                        </>
                    ) : (
                        <>
                            <Link className="button-3 right" to="/login" style={{ marginRight: "40px" }}>
                                Login
                            </Link>
                            <Link className="btn btn-lg btn-light button-3 right" to="/signup">
                                Signup
                            </Link>
                        </>
                    )}
                    <Link className="button-3 left" to="/about">
                        About us
                    </Link>
                    <Link className="button-3 left" to="/donate">
                        Donate to save more trees!
                    </Link>
                </div>
            </nav>
        </NavbarContainer>
    );
};

export default Navbar;


const NavbarContainer = styled.div`
    position: fixed;
    display: block;
    height: 5em;
    min-width: 100vw;
    background: #77A17A;
    z-index: 10;
    overlay: hidden;
  `;