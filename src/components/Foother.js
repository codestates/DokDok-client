import React from 'react';
import '../scss/Foother.scss';

const Foother = () => {
  return (
    <div className="foother">
      <div
        className="logo-full"
        style={{ backgroundImage: `url(${'dokdok-logo-full.png'})` }}
      />
      <div className="contact">
        <p className="bold-text">CONTACT</p>

        <div onClick={() => {}}>Send inquire</div>
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
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            이소임
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            최시용
          </a>
        </div>

        <div>Back</div>
        <div className="back">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            강주현
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            조태규
          </a>
        </div>
      </div>
    </div>
  );
};

export default Foother;
