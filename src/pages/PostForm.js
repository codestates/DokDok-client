import '../scss/PostForm.scss';
import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setMessageModal, setPost } from '../actions';

import DaumPostCode from '../components/DaumPostcode';
import MarkerMap from '../components/MarkerMap';

const { kakao } = window;

const PostForm = ({ post, history, match }) => {
  const dispatch = useDispatch();
  const fileInput = useRef(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState(0);
  const [state, setState] = useState('exchange');
  const [images, setImages] = useState([]);
  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (match.path === '/post-edit') {
      const postImages = [
        post.image1,
        post.image2,
        post.image3,
        post.image4,
        post.image5,
      ];

      setTitle(post.title);
      setType(post.type);
      setState(post.state);
      setImages(postImages.filter((image) => image !== null));
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
      setImages([]);
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
    const geocoder = new kakao.maps.services.Geocoder();

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

  useEffect(() => {
    if (images.length + files.length > 5) {
      dispatch(setMessageModal(true, '사진은 5개까지만 업로드 가능합니다.'));
      fileInput.current.value = '';
      setFiles([]);
      return;
    } else {
      const convertFile = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];

        let reader = new FileReader();
        reader.onload = () => {
          convertFile[i] = reader.result;
          setFileURLs([...convertFile]);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [files, dispatch, images.length]);

  async function submitForm(e) {
    e.preventDefault();

    if (
      title === '' ||
      content === '' ||
      images.length + files.length === 0 ||
      detailAddress === ''
    ) {
      dispatch(setMessageModal(true, '빈 항목이 있습니다.'));
      return;
    }
    
    dispatch(setIsLoading(true));

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', Number(type));
    formData.append('state', state);
    formData.append('content', content);
    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i]);
    }
    formData.append('address', address);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    for (let i = 0; i < images.length; i++) {
      formData.append('prevImage', images[i]);
    }

    if (match.path === '/post-edit') {
      await axios
        .patch(`${process.env.REACT_APP_API_URL}/posts/${post.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res);
          dispatch(setPost({ ...res.data.post, User: { ...post.User } }));
          history.goBack();
          dispatch(setMessageModal(true, '게시글 수정이 완료되었습니다.'));
        })
        .catch((err) => {
          if (err) throw err;
        });
    }

    if (match.path === '/post-create') {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/posts`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          history.push('/main');
          dispatch(setMessageModal(true, '게시글 작성이 완료되었습니다.'));
        })
        .catch((err) => {
          if (err) throw err;
        });
    }
  }

  const fileHandle = (e) => {
    setFiles(e.target.files);
  };

  const searchAddress = () => {
    setIsPopupOpen(true);
  };

  const closeSearchAddress = (query) => {
    setAddress(query);
    setIsPopupOpen(false);
  };

  const setSearchAddress = (query) => {
    setDetailAddress(query);
  };

  return (
    <React.Fragment>
      <div
        className={isPopupOpen ? 'popup-search' : 'popup-search hidden'}
        onClick={closeSearchAddress}
      >
        <DaumPostCode
          setSearchAddress={setSearchAddress}
          closeSearchAddress={closeSearchAddress}
        />
      </div>
      <form className="post-form">
        <div className="header">
          <i className="fas fa-pen fa-2x"></i>
          <h2>게시글 {match.path === '/post-create' ? '작성' : '수정'}</h2>
        </div>
        <div className="form-entry">
          <div className="bold-text">제목</div>
          <input
            type="text"
            placeholder="책 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="type-and-state form-entry">
          <div className="type">
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
          <div className="state">
            <div className="bold-text">거래 상태</div>
            <select
              name="trade-state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="exchange">거래 전</option>
              {match.path === '/post-edit' ? (
                <React.Fragment>
                  <option value="exchanging">거래 중</option>
                  <option value="exchanged">거래 완료</option>
                </React.Fragment>
              ) : null}
            </select>
          </div>
        </div>

        <div className="img-area form-entry">
          <div className="bold-text">사진</div>
          <div className="img-wrap">
            {images
              ? images.map((image, i) => <img src={image} alt="" key={i} />)
              : null}
            {fileURLs
              ? fileURLs.map((fileURL, i) => (
                  <img src={fileURL} alt="" key={i} />
                ))
              : null}

            {images.length + files.length === 5 ? null : (
              <label className="file-input">
                <input
                  type="file"
                  ref={fileInput}
                  accept="image/jpg,image/png,image/jpeg,image/gif"
                  multiple
                  onChange={fileHandle}
                />
                <i className="fas fa-plus fa-lg"></i>
              </label>
            )}
          </div>
        </div>
        <div className="form-entry">
          <div className="bold-text">내용</div>
          <textarea
            placeholder="책에 대해 설명해주세요. (ex. 내용, 책 상태, 구입 시기 등)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-entry">
          <div className="bold-text">만남 장소</div>
          <div className="address">
            {detailAddress ? `${detailAddress}` : '주소를 검색해주세요'}
            <button
              className="btn"
              type="button"
              onClick={searchAddress}
              value="주소 검색"
            >
              주소 검색
            </button>
          </div>
        </div>

        {longitude && latitude ? (
          <MarkerMap latitude={latitude} longitude={longitude} />
        ) : null}
        <div className="submit-and-cancel">
          <button className="btn" onClick={submitForm}>
            완료
          </button>
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            취소
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default withRouter(PostForm);
