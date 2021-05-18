import React from 'react';
import '../scss/Foother.scss';

const Foother = () => {
  return (
    <div className="foother">
      <div className="logo">logo</div>
      <div className="contact">
        CONTACT
        <div onClick={() => {}}>Send inquire</div>
      </div>
      <div className="about-us">
        ABOUT US
        <a href="https://github.com/codestates/DokDok-client" target="_blank">
          Repository
        </a>
        <a
          href="https://github.com/codestates/DokDok-client/wiki"
          target="_blank"
        >
          Wiki
        </a>
      </div>
      <div className="team-members">
        TEAM MEMBERS
        <div>Front</div>
        <a href="" target="_blank">
          이소임
        </a>
        <a href="" target="_blank">
          최시용
        </a>
        <div>Back</div>
        <a href="" target="_blank">
          강주현
        </a>
        <a href="" target="_blank">
          조태규
        </a>
      </div>
    </div>
  );
};

export default Foother;
