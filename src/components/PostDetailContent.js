import React from 'react';
import { withRouter } from 'react-router-dom';

const PostDetailContent = ({ post }) => {
  return (
    <React.Fragment>
      <div className="content-header">
        <div className="userinfo">
          <div
            className="profile-image"
            style={{ backgroundImage: `url(${post.authorProfileImage})` }}
          />
          <div>
            <div className="nickname">{post.nickname}</div>
            <div className="address">{post.address}</div>
          </div>
        </div>
        <div className="icons">
          <i className="fas fa-comment-dots fa-lg" />
          <i className="fas fa-heart fa-lg" />
          <i className="fas fa-edit fa-lg" />
          <i className="fas fa-trash-alt fa-lg" />
        </div>
      </div>
      <hr />
      <div className="content">
        <div>
          <p className="title">{post.title}</p>
          <p>{post.createdAt}</p>
        </div>
        <div>{post.content}</div>
      </div>
      <div className="map-title">만남 장소</div>
    </React.Fragment>
  );
};

export default withRouter(PostDetailContent);
