import axios from 'axios';
import React, { useState } from 'react';

const CommentListEntry = ({ comment, getCommentList }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [commentValue, setCommentValue] = useState(comment.comment);

  const convertTime = (date) => {
    const today = new Date();
    const timeValue = new Date(date);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 5) {
      return '방금 전';
    }
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일 전`;
    }
    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  };

  const editComment = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/comments/${comment.id}`,
        {
          comment: commentValue,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        },
      )
      .then(() => {
        setIsEdit(false);
        getCommentList();
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const deleteComment = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/comments/${comment.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then(() => {
        getCommentList();
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <div className="comment-area">
      <div className="header">
        <div className="nickname">{comment.User.nickname}</div>
        {/* 추후 userid 동일한 경우에만 버튼 보이도록 수정 */}
        <div className={isEdit ? null : 'hide'}>
          <i className="fas fa-check" onClick={editComment}></i>
          <i
            className="fas fa-times"
            onClick={() => {
              setIsEdit(false);
              setCommentValue(comment.comment);
            }}
          ></i>
        </div>
        <div className={isEdit ? 'hide' : null}>
          <i className="fas fa-edit" onClick={() => setIsEdit(true)}></i>
          <i className="fas fa-trash-alt" onClick={deleteComment}></i>
        </div>
      </div>

      <div className="date">{convertTime(comment.createdAt)}</div>
      <textarea
        className={isEdit ? null : 'hide'}
        type="text"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        maxLength="300"
      ></textarea>
      <div className={isEdit ? 'hide' : 'content'}>{comment.comment}</div>
    </div>
  );
};

export default CommentListEntry;
