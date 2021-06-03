import '../../scss/landing/FeatureDetail.scss';
import React from 'react';

function FeatureDetail() {
  return (
    <div className="feature-detail">
      <div className="feature">
        <i className="fas fa-book-open fa-3x">
          <div className="background" />
        </i>
        <h2>책 교환</h2>
        <div>
          독독은 교환할 책을 게시해 회원 간 책 교환을 돕는 플랫폼입니다.
        </div>
      </div>
      <div className="feature">
        <i className="fas fa-map-marker-alt fa-3x">
          <div className="background" />
        </i>
        <h2>직거래 위치 지정</h2>
        <div>
          게시글을 작성할 때 거래 장소를 지정할 수 있고, 동 단위로 검색도
          가능합니다.
        </div>
      </div>
      <div className="feature">
        <i className="fas fa-comment-dots fa-3x">
          <div className="background" />
        </i>
        <h2>1:1 채팅</h2>
        <div>
          직거래 시간 조율, 장소 변경 등을 위한 회원 간 1:1 채팅을 지원합니다.
        </div>
      </div>
    </div>
  );
}

export default FeatureDetail;
