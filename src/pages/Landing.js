import '../scss/landing/Landing.scss';
import React from 'react';
import { withRouter } from 'react-router-dom';
import FeatureDetail from '../components/landing/FeatureDetail';
import ImageAndContent from '../components/landing/ImageAndContent';
import UserReview from '../components/landing/UserReview';
import GoTop from '../components/landing/GoTop';

function Landing() {
  return (
    <div className="landing">
      <GoTop />
      <ImageAndContent
        headers={[
          '다 읽은 책,',
          '흥미가 떨어진 책.',
          '먼지만 쌓여있진 않나요?',
        ]}
        sentences={[
          '이제 먼지를 털고 새 책으로 교환할 때입니다!',
          '주변에 어떤 책들이 당신을 기다리고 있는지 확인해보세요.',
        ]}
        imageLink={'images/many-book.png'}
        className={'first-content'}
      />
      <FeatureDetail />
      <ImageAndContent
        headers={['우리 지역을 검색해', '어떤 책들이 있는지', '살펴보세요']}
        sentences={[
          '원하는 지역을 검색해 그 장소 근처에서 거래를 원하는',
          '책들을 살펴볼 수 있습니다.',
        ]}
        imageLink={'images/map.png'}
        className={'landing-map'}
      />
      <ImageAndContent
        headers={[
          '게시글 내 위치를 확인하고',
          '채팅을 보내',
          '거래 약속을 잡으세요',
        ]}
        sentences={[
          '만남 위치가 지도로 삽입되어 있어 확인이 편리하고,',
          '글 작성자와 1:1 채팅을 할 수도 있습니다.',
        ]}
        imageLink={'images/chat-women.png'}
        className={'chat-women'}
      />
      <UserReview />
      <ImageAndContent
        headers={[
          '지금 독독으로',
          '다시 당신의 가슴을 설레게 할',
          '새로운 책을 찾으세요',
        ]}
        sentences={['교환할 책을 챙겨오는 것도 잊지 마세요!']}
        imageLink={'images/three-people-reading-2.png'}
        className={'last-content'}
      />
    </div>
  );
}

export default withRouter(Landing);
