import '../scss/PostDetail.scss';
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';

const PostDetail = ({ post }) => {
  if (post === null) {
    return <Redirect to="/main" />;
  }
  return (
    <div className="post-detail">
      <ImageSlider
        image1={post.image1}
        image2={post.image2}
        image3={post.image3}
        image4={post.image4}
        image5={post.image5}
      />
      <p>Post Detail</p>
    </div>
  );
};

export default withRouter(PostDetail);
