import axios from 'axios';
import React, { useState } from 'react';

const CommentInput = ({ getCommentList }) => {
  const [comment, setComment] = useState('');

  const sendCommentToServer = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comments/${comment.id}`,
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
        // 댓글을 등록하였습니다 모달
        getCommentList();
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
        maxlength="300"
      ></textarea>
      <button onClick={sendCommentToServer}>등록</button>
    </div>
  );
};

export default CommentInput;
