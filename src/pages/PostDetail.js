import '../scss/PostDetail.scss';
import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import ImageSlider from '../components/ImageSlider';

import { mockComments } from '../fakeData/mockComments';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';

const PostDetail = ({ post }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => getCommentList(), []);

  if (post === null) {
    return <Redirect to="/main" />;
  }

  const getCommentList = () => {
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/comments/${post.id}`)
    //   .then((res) => {
    //     setComments(res.data.comments);
    //   })
    //   .catch((err) => {
    //     if (err) throw err;
    //   });

    setComments(mockComments);
  };

  return (
    <div className="post-detail">
      <ImageSlider
        image1={post.image1}
        image2={post.image2}
        image3={post.image3}
        image4={post.image4}
        image5={post.image5}
      />
      <CommentInput getCommentList={getCommentList} />
      <CommentList comments={comments} getCommentList={getCommentList} />
    </div>
  );
};

export default withRouter(PostDetail);
