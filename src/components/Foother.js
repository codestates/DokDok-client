import React from 'react';
import { withRouter } from 'react-router-dom';
import '../scss/Foother.scss';

const Foother = ({ history }) => {
  return (
    <div className="foother">
      <div
        className="logo-full"
        style={{ backgroundImage: `url(${'images/dokdok-logo-full.png'})` }}
      />
      <div className="contact">
        <p className="bold-text">CONTACT</p>

        <div onClick={() => history.push('/inquire')}>Send inquire</div>
      </div>
      <div className="about-us">
        <p className="bold-text">ABOUT US</p>

        <a
          href="https://github.com/codestates/DokDok-client"
          target="_blank"
          rel="noreferrer"
        >
          Repository
        </a>
        <a
          href="https://github.com/codestates/DokDok-client/wiki"
          target="_blank"
          rel="noreferrer"
        >
          Wiki
        </a>
      </div>
      <div className="team-members">
        <p className="bold-text">TEAM MEMBERS</p>

        <div>Front</div>
        <div className="front">
          <a
            href="https://github.com/hande-sof"
            target="_blank"
            rel="noreferrer"
          >
            이소임
          </a>
          <a href="https://github.com/do0ogz" target="_blank" rel="noreferrer">
            최시용
          </a>
        </div>

        <div>Back</div>
        <div className="back">
          <a
            href="https://github.com/KangJuHyeon"
            target="_blank"
            rel="noreferrer"
          >
            강주현
          </a>
          <a href="https://github.com/0r0loo" target="_blank" rel="noreferrer">
            조태규
          </a>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Foother);
