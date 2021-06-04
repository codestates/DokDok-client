import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  setIsLoading,
  setIsLogin,
  setMessageModal,
  setUserinfo,
} from '../actions';
import '../scss/UpdateUserInfo.scss';

const UpdateUserInfo = ({ userinfo, history }) => {
  const [isNickNameVisible, setIsNickNameVisible] = useState(false);
  const [isPassWordVisible, setisPassWordVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const previousImg = userinfo.profileImage;

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    if (!data.nickname && !data.password && !file) {
      dispatch(setMessageModal(true, '수정된 사항이 없습니다.'));
      return;
    }

    dispatch(setIsLoading(true));

    const frm = new FormData();

    if (data.nickname) {
      frm.append('nickname', data.nickname);
    }
    if (file) {
      frm.append('profileImage', file);
    }
    if (data.password) {
      frm.append('password', data.password);
    }

    axios
      .patch(process.env.REACT_APP_API_URL + '/users', frm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then(function (res) {
        dispatch(setUserinfo(res.data.user));
        history.push('/mypage');
      })
      .catch(function (err) {
        if (err) throw err;
      });

    reset();
  };

  //버튼클릭시 인풋박스
  const changeNickNameVisible = () => {
    setIsNickNameVisible(!isNickNameVisible);
  };

  const changePassWordVisible = () => {
    setisPassWordVisible(!isPassWordVisible);
  };

  //이미지미리보기

  const insertImg = (e) => {
    setFile(e.target.files[0]);
    let reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;

      if (previewImgUrl) {
        setPreviewImg(previewImgUrl);
      }
    };
  };

  const withdrawal = () => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/users/withdrawal`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then(() => {
        dispatch(setIsLogin(false));
        dispatch(setUserinfo({}));
        dispatch(setMessageModal(true, '회원 탈퇴가 완료되었습니다.'));
        history.push('/main');
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <form className="update-user-info" onSubmit={handleSubmit(onSubmit)}>
      <div className="header">
        <i className="fas fa-pen fa-2x"></i>
        <h2>회원 정보수정</h2>
      </div>
      <div className="update-box">
        <label>
          <input
            className="hidden"
            type="file"
            id="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={(e) => insertImg(e)}
          ></input>
          <div className="user-profile-img">
            <img src={previewImg ? previewImg : previousImg} alt="" />
            <div className="hover-overlay">
              <p>이미지</p>
              <p>업로드</p>
            </div>
          </div>
        </label>

        <div className="user-info-box">
          <div className="user-info-left">
            <span>이메일</span>
            <span>닉네임</span>
            <span>비밀번호</span>
          </div>

          <div className="user-info-right">
            <span>{userinfo.email}</span>
            <div className="input-wrapper">
              {isNickNameVisible ? (
                <label>
                  <input
                    defaultValue={userinfo.nickname}
                    type="text"
                    {...register('nickname', {
                      required: '닉네임을 입력해주세요.',
                      maxLength: {
                        value: 10,
                        message: '10자 미만으로 설정해주세요.',
                      },
                    })}
                  />
                  <button className="btn" onClick={changeNickNameVisible}>
                    취소
                  </button>
                  {errors.nickname && <p>{errors.nickname.message}</p>}
                </label>
              ) : (
                <div>
                  <span>{userinfo.nickname}</span>
                  <button className="btn" onClick={changeNickNameVisible}>
                    변경
                  </button>
                </div>
              )}
            </div>
            <div className="input-wrapper">
              {isPassWordVisible ? (
                <label>
                  <input
                    className="input-box-password"
                    type="password"
                    {...register('password', {
                      required: '비밀번호를 입력해주세요.',
                      minLength: {
                        value: 6,
                        message: '비밀번호는 최소 6자 이상입니다.',
                      },
                    })}
                  />
                  <button className="btn" onClick={changePassWordVisible}>
                    취소
                  </button>
                  {errors.password && <p>{errors.password.message}</p>}
                </label>
              ) : (
                <div>
                  <button className="btn" onClick={changePassWordVisible}>
                    변경
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="btn-sub-update">
          <button className="btn" type="submit">
            수정
          </button>
          <button className="btn" onClick={() => history.push('/mypage')}>
            취소
          </button>
        </div>
      </div>
      <div className="withdrawal">
        <span>독독을 더이상 이용하지 않는다면</span>
        <span onClick={withdrawal}>회원 탈퇴</span>
      </div>
    </form>
  );
};

export default withRouter(UpdateUserInfo);
