import '../scss/PostDetail.scss';
import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import ImageSlider from '../components/ImageSlider';

import { mockComments } from '../fakeData/mockComments';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';
import PostDetailContent from '../components/PostDetailContent';
import MarkerMap from '../components/MarkerMap';

const PostDetail = ({ post }) => {
  const [singlePost, setSinglePost] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getPostDetail();
    getCommentList();
  }, []);

  if (post === null) {
    return <Redirect to="/main" />;
  }

  if (post.authorProfileImage === null) {
    // 임시 이름
    post.authorProfileImage = 'default-profile-picture_150.jpg';
  }

  const getPostDetail = () => {
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/posts/${post.id}`)
    //   .then((res) => {
    //     setSinglePost(res.data.post);
    //   })
    //   .catch((err) => {
    //     if (err) throw err;
    //   });

    setSinglePost(post);
  };

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
        image1={singlePost.image1}
        image2={singlePost.image2}
        image3={singlePost.image3}
        image4={singlePost.image4}
        image5={singlePost.image5}
      />
      <PostDetailContent post={singlePost} />
      <MarkerMap />
      <div className="extra-info">
        <span>댓글 {comments.length}</span>
        <span>관심 {singlePost.interest_cnt}</span>
      </div>
      <hr />
      <CommentInput getCommentList={getCommentList} post={singlePost} />
      <CommentList comments={comments} getCommentList={getCommentList} />
    </div>
  );
};

export default withRouter(PostDetail);
