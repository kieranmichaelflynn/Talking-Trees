import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";


const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <FooterContainer>

      <footer>
        <div>
          {location.pathname !== '/' && (
            <button 
              className="button-3" role="button"
              onClick={() => navigate(-1)}
            >
              &larr; Return
            </button>
          )}
          <h4 className='footer'>
            Made with{' '}
            <span style={{margin:"0"}}
              className="emoji"
              role="img"
              aria-label="heart"
              aria-hidden="false"
            >
              ❤️
            </span> {' '}
            by the TalkingTrees team.
          </h4>
        </div>
      </footer>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  position: absolute;
  display: flex;
  background: #647D6A;
  height: 8rem;
  left: 0;
  bottom: 0;
  width: 100vw;
  flex-flow: column wrap;
  overflow: hidden;

`;