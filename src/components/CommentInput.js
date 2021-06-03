import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginModal, setMessageModal } from '../actions';

const CommentInput = ({ getCommentList, post, isLogin }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const sendCommentToServer = () => {
    if (!isLogin) {
      dispatch(setLoginModal(true));
      return;
    } else if (comment === '') {
      dispatch(setMessageModal(true, '댓글을 입력해주세요.'));
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comments/${post.id}`,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        dispatch(setMessageModal(true, '댓글을 등록했습니다.'));
        getCommentList();
        setComment('');
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <div className="comment-input-area">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력해주세요"
        maxLength="300"
      ></textarea>
      <button className="btn" onClick={sendCommentToServer}>
        등록
      </button>
    </div>
  );
};

export default CommentInput;
