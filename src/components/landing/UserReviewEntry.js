import React from 'react';

function UserReviewEntry({ username, profilePic, content }) {
  return (
    <div className="review-entry">
      <div className="userinfo">
        <div
          className="profile-pic"
          style={{
            backgroundImage: `url(${profilePic})`,
          }}
        />
        <div>
          <div className="username">{username}</div>
          <i className="fas fa-star fa-sm" />
          <i className="fas fa-star fa-sm" />
          <i className="fas fa-star fa-sm" />
          <i className="fas fa-star fa-sm" />
          <i className="fas fa-star fa-sm" />
        </div>
      </div>
      <p>{content}</p>
    </div>
  );
}

export default UserReviewEntry;
