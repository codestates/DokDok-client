import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setMessageModal, setPost } from '../actions';

import DaumPostCode from '../components/DaumPostcode';
import MarkerMap from '../components/MarkerMap';

const { kakao } = window;

const PostForm = ({ post, history, match }) => {
  const geocoder = new kakao.maps.services.Geocoder();
  const dispatch = useDispatch();
  const fileInput = useRef(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState(0);
  const [state, setState] = useState('exchange');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (match.path === '/post-edit') {
      setTitle(post.title);
      setType(post.type);
      setState(post.state);
      setImage1(post.image1);
      setImage2(post.image2);
      setImage3(post.image3);
      setImage4(post.image4);
      setImage5(post.image5);
      setContent(post.content);
      setAddress(post.address);
      setDetailAddress(post.roadAddress);
      setLatitude(post.latitude);
      setLongitude(post.lonitude);
    }

    if (match.path === '/post-create') {
      setTitle('');
      setType(0);
      setState('exchange');
      setImage1('');
      setImage2('');
      setImage3('');
      setImage4('');
      setImage5('');
      setContent('');
      setAddress('');
      setDetailAddress('');
      setLatitude(null);
      setLongitude(null);
    }

    return () => {
      dispatch(setPost(null));
    };
  }, [match.path]);

  useEffect(() => {
    if (detailAddress === '') {
      return;
    }
    geocoder.addressSearch(detailAddress, function (results, status) {
      if (status === kakao.maps.services.Status.OK) {
        const result = results[0];
        setLatitude(Number(result.y));
        setLongitude(Number(result.x));
      }
    });
  }, [detailAddress]);

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('images', files);

    for (let key of formData.entries()) {
      console.log(key);
    }
  };

  const fileHandle = (e) => {
    setFiles(e.target.files);

    if (files.length > 5) {
      dispatch(setMessageModal(true, '이미지는 5개까지만 업로드 가능합니다.'));
      fileInput.current.value = '';
    }
  };

  const searchAddress = () => {
    setIsPopupOpen(true);
  };

  const closeSearchAddress = () => {
    setIsPopupOpen(false);
  };

  const setSearchAddress = (query) => {
    setDetailAddress(query);
  };

  return (
    <form className="post-form">
      <div id="popup-search">
        {isPopupOpen && (
          <DaumPostCode
            setSearchAddress={setSearchAddress}
            closeSearchAddress={closeSearchAddress}
          />
        )}
      </div>
      <div>
        <div className="bold-text">제목</div>
        <input
          type="text"
          placeholder="책 제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <div className="bold-text">책분류</div>
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="0">총류</option>
          <option value="1">철학</option>
          <option value="2">종교</option>
          <option value="3">사회과학</option>
          <option value="4">자연과학</option>
          <option value="5">기술과학</option>
          <option value="6">예술</option>
          <option value="7">언어</option>
          <option value="8">문학</option>
          <option value="9">역사</option>
        </select>
      </div>
      <div>
        <div className="bold-text">거래 상태</div>
        <select
          name="trade-state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="exchange">거래 전</option>
          <option value="exchanging">거래 중</option>
          <option value="exchanged">거래 완료</option>
        </select>
      </div>
      <div>
        <div className="bold-text">사진</div>
        <input
          type="file"
          ref={fileInput}
          accept="image/jpg,image/png,image/jpeg,image/gif"
          multiple
          onChange={fileHandle}
        />
      </div>
      <div>
        <div className="bold-text">내용</div>
        <textarea
          placeholder="책에 대해 설명해주세요. (ex. 내용, 책 상태, 구입 시기 등)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div>
        <div className="bold-text">만남 장소</div>
        {detailAddress ? detailAddress : '주소를 검색해주세요'}
        <input type="button" onClick={searchAddress} value="주소 검색" />
      </div>
      {longitude && latitude ? (
        <MarkerMap latitude={latitude} longitude={longitude} />
      ) : null}
      <button onClick={submitForm}>완료</button>
      <button>취소</button>
    </form>
  );
};

export default withRouter(PostForm);
