import React from 'react';
import { Link } from 'react-router-dom';

import styled from "styled-components";


import Auth from '../../utils/auth';
import logo from "../../images/TalkingTreesLogo.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <MainContainer>

      <header>
        <div>
          <div>
            <Link className="text-light" style={{ justifyContent: "center", alignItems: "center" }} to="/">
              <img style={{ position: "absolute", width: "370px", height: "282px", left: "calc(50% - 370px/2)", top: "calc(50% - 282px/2 - 202px)" }} src={logo} alt="logo" />

            </Link>
          </div>

        </div>
      </header>
    </MainContainer>
  );
};

export default Header;

const MainContainer = styled.header`
  background: url(../../images/treebg.png) no-repeat center/cover;
  height: 30rem;

  h1 {
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: 900;
    position: absolute;
    top: 25%;
    left: 50%;
  }
`;