import '../scss/CommentList.scss';
import React from 'react';
import CommentListEntry from './CommentListEntry';

const CommentList = ({ comments, getCommentList, userId }) => {
  if (comments === null) {
    return <></>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentListEntry
          key={comment.id}
          comment={comment}
          getCommentList={getCommentList}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default CommentList;
