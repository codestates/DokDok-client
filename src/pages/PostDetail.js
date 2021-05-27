import '../scss/PostDetail.scss';
import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import ImageSlider from '../components/ImageSlider';

// import { mockComments } from '../fakeData/mockComments';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';
import PostDetailContent from '../components/PostDetailContent';
import MarkerMap from '../components/MarkerMap';
import { useDispatch } from 'react-redux';
import { setPost } from '../actions';

const PostDetail = ({ post, isLogin, userId }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [roadAddress, setRoadAddress] = useState('');

  useEffect(() => {
    getPostDetail();
    getCommentList();
  }, []);

  useEffect(() => {
    dispatch(setPost({ ...post, roadAddress: roadAddress }));
  }, [roadAddress]);

  if (post === null) {
    return <Redirect to="/main" />;
  }

  async function getPostDetail() {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${post.id}`)
      .then((res) => {
        if (!res.data.data.User.profile_image) {
          const profileImage = 'default-profile-picture_150.jpg';
          dispatch(
            setPost({
              ...res.data.data,
              User: { ...res.data.data.User, profile_image: profileImage },
            }),
          );
        } else {
          dispatch(setPost(res.data.data));
        }
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  const getCommentList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/comments/${post.id}`)
      .then((res) => {
        setComments(res.data.data);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const changeRoadAddress = (query) => {
    setRoadAddress(query);
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
      <PostDetailContent post={post} isLogin={isLogin} userId={userId} />
      <MarkerMap
        latitude={post.latitude}
        longitude={post.longitude}
        changeRoadAddress={changeRoadAddress}
      />
      <div className="extra-info">
        <span>댓글 {comments.length}</span>
        <span>관심 {post.interest_cnt}</span>
      </div>
      <hr />
      <CommentInput
        getCommentList={getCommentList}
        post={post}
        isLogin={isLogin}
      />
      <CommentList comments={comments} getCommentList={getCommentList} />
    </div>
  );
};

export default withRouter(PostDetail);
