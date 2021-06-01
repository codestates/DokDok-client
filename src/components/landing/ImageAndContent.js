import React from 'react';
import { withRouter } from 'react-router';

function ImageAndContent({
  headers,
  sentences,
  imageLink,
  className,
  history,
}) {
  const isThereButton =
    className === 'first-content' || className === 'last-content';
  return (
    <div className={className}>
      <div className="contents">
        {className === 'landing-map' ? <h3>01</h3> : null}
        {className === 'chat-women' ? <h3>02</h3> : null}
        <div className="headers">
          {headers.map((header) => (
            <h1>{header}</h1>
          ))}
        </div>
        <div className="sentences">
          {sentences.map((sentence) => (
            <p>{sentence}</p>
          ))}
        </div>
        {className === 'last-content' ? <img src={imageLink} alt="" /> : null}
        {isThereButton ? (
          <button className="btn" onClick={() => history.push('/main')}>
            최근 게시물 보기
          </button>
        ) : null}
      </div>

      <img className="content-img" src={imageLink} alt="" />
    </div>
  );
}

export default withRouter(ImageAndContent);
