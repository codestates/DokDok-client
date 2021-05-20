import '../scss/CommentList.scss';
import React from 'react';
import CommentListEntry from './CommentListEntry';

const CommentList = ({ comments, getCommentList }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentListEntry
          key={comment.id}
          comment={comment}
          getCommentList={getCommentList}
        />
      ))}
    </div>
  );
};

export default CommentList;
