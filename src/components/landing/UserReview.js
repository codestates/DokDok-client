import '../../scss/landing/UserReview.scss';
import React from 'react';
import UserReviewEntry from './UserReviewEntry';

function UserReview({}) {
  const reviews = [
    {
      username: 'hand**',
      profilePic: 'images/default-profile-picture_150.jpg',
      content:
        '와우 정말 좋았음 어떤 점이 좋았냐면 정확하게 말할 수 없지만 아무튼 좋았음',
    },
    {
      username: 'user**',
      profilePic: 'images/default-profile-picture_150.jpg',
      content: '뭔진 모르겠지만 엄청남',
    },
    {
      username: 'some**',
      profilePic: 'images/default-profile-picture_150.jpg',
      content: '하나 정도는 더 있어야 할듯',
    },
  ];

  return (
    <div className="user-review">
      <h1>독독 사용자들은 어떻게 생각할까요?</h1>
      <div className="reviews">
        {reviews.map((review) => (
          <UserReviewEntry
            username={review.username}
            profilePic={review.profilePic}
            content={review.content}
          />
        ))}
      </div>
    </div>
  );
}

export default UserReview;
