import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setMessageModal, setUserinfo } from '../actions';

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

  return (
    <form
      className="updateUserInfo-input-box"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="UpdateUserInfo">
        <label>
          <input
            className="hidden"
            type="file"
            id="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={(e) => insertImg(e)}
          ></input>
          <img
            src={previewImg ? previewImg : previousImg}
            className="img"
          ></img>
        </label>

        <div className="user-info">
          <div>이메일 {userinfo.email}</div>

          <div>닉네임</div>
          {isNickNameVisible ? (
            <label className="input-box-nickname">
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
              {errors.nickname && <p>{errors.nickname.message}</p>}
              <button onClick={changeNickNameVisible}>취소</button>
            </label>
          ) : (
            <div>
              <div>{userinfo.nickname}</div>
              <button onClick={changeNickNameVisible}>변경</button>
            </div>
          )}
          <div>비밀번호</div>
          {isPassWordVisible ? (
            <label className="input-box-password">
              <input
                type="password"
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자 이상입니다.',
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
              <button onClick={changePassWordVisible}>취소</button>
            </label>
          ) : (
            <div>
              <button onClick={changePassWordVisible}>변경</button>
            </div>
          )}

          <button className="UpdateUserInfo-btn" type="submit">
            수정
          </button>
          <button onClick={() => history.push('/mypage')}>취소</button>
        </div>
      </div>
    </form>
  );
};

export default withRouter(UpdateUserInfo);
