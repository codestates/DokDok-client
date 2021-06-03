import '../../scss/landing/UserReview.scss';
import React, { useEffect, useRef, useState } from 'react';
import UserReviewEntry from './UserReviewEntry';

function UserReview({}) {
  const reviewsRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);

  const reviews = [
    {
      username: 'do0o**',
      profilePic: 'images/default-profile-picture_150.jpg',
      content: `어릴 땐 재밌게 읽었지만 지금 읽기는 유치한 책들
        독독을 통해서 8살 어린이 주현이에게 선물해 줬어요!!
        마음이 따듯한 하루입니다~`,
    },
    {
      username: 'hand**',
      profilePic: 'images/default-profile-picture_150.jpg',
      content: `새 책 구입에 드는 돈이 은근 만만치 않은데...
      독독을 이용하니 부담이 확 줄었습니다.
      진작에 사용해볼 걸 그랬네요. 추천합니다!`,
    },
    {
      username: 'kang**',
      profilePic: 'images/default-profile-picture_150.jpg',
      content: `어제 책 두 권 올렸는데 채팅 문의가 엄청 와있어서 놀랐고,
      생각 외로 거래가 빨리 되어 놀랐어요.
      그리고 원하던 책을 얻게 되어 세 번 놀랐어요!!
      돈 한 푼 안 쓰고 개이득!`,
    },
    {
      username: 'sae2**',
      profilePic: 'images/default-profile-picture_150.jpg',
      content: `거래 전에도 미리 직거래 위치 파악할 수 있다는 점이 좋습니다.
      중고 거래에서 직거래 위치 조율하는 게 여간 귀찮은 일이 아니라서요.
      ~~동 검색하면 최근 게시물부터 나와서 가볍게 둘러보기 좋아요.`,
    },
    {
      username: 'some**',
      profilePic: 'images/default-profile-picture_150.jpg',
      content: `5`,
    },
    {
      username: 'user**',
      profilePic: 'images/default-profile-picture_150.jpg',
      content: `6`,
    },
  ];
  const maxWidth = 288 * reviews.length;

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    if (!clientWidth) {
      setClientWidth(reviewsRef.current.clientWidth);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const handleResize = () => {
    setClientWidth(reviewsRef.current.clientWidth);
    setScrollX(0);
  };

  const changeScroll = (e) => {
    if (e.target.className === 'fas fa-chevron-left fa-lg') {
      if (scrollX + 288 > 0) {
        setScrollX(0);
        return;
      }
      setScrollX(scrollX + 288);
    } else {
      if (Math.abs(scrollX - 288) + clientWidth > maxWidth) {
        setScrollX((maxWidth - clientWidth) * -1);
        return;
      }
      setScrollX(scrollX - 288);
    }
  };

  return (
    <div className="user-review">
      <div className="header">
        <h1>독독 사용자들은 어떻게 생각할까요?</h1>
      </div>
      <div className="content">
        <div className="arrows">
          <i className="fas fa-chevron-left fa-lg" onClick={changeScroll}></i>
          <i className="fas fa-chevron-right fa-lg" onClick={changeScroll}></i>
        </div>
        <div
          ref={reviewsRef}
          className="reviews"
          style={{ transform: `translateX(${scrollX}px)` }}
        >
          {reviews.map((review, i) => (
            <UserReviewEntry
              key={i}
              username={review.username}
              profilePic={review.profilePic}
              content={review.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserReview;
