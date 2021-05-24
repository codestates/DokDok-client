import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
// import '../scss/UpdateUserInfo.scss';

const UpdateUserInfo = ({ userinfo, history }) => {
  let profileImage = userinfo.profileImage;

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    console.log(data);
    //악시오스 로그인 요청
    axios
      .post(
        process.env.REACT_APP_API_URL + '/users/updateUserInfo',
        {
          nickname: data.nickname,
          password: data.password,
          profileImage: data.profileImage,
        },
        {
          'Content-Type': 'application/json',
        },
      )
      .then(function () {
        console.log('수정완료');
      })
      .catch(function (err) {
        console.log(err);
      });
    reset();
  };

  return (
    <form
      className="updateUserInfo-input-box"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="UpdateUserInfo">
        <div className="user-profile-img">
          <img src={profileImage} className="img"></img>
        </div>
        <div className="user-info">
          <div>이메일 {userinfo.email}</div>
          {/* <p>이메일 {userinfo.email}</p> */}

          <div>닉네임</div>
          <label className="input-box">
            <input
              placeholder="Nickname"
              {...register('nickname', {
                required: '닉네임을 입력후 변경버튼을 눌러주세요.',
                maxLength: {
                  value: 10,
                  message: '10자 미만으로 설정해주세요.',
                },
              })}
            />
            {errors.nickname && <p>{errors.nickname.message}</p>}
            <button
              className="btn nicname-modify"
              onClick={() => history.push()}
            >
              변경
            </button>
          </label>

          <div>Password</div>
          <label className="input-box">
            <input
              placeholder="password"
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
          </label>
          <button
            className="btn password-modify"
            onClick={() => history.push()}
          >
            변경
          </button>
          <p>기존 비밀번호</p>

          <button className="UpdateUserInfo-btn" type="submit">
            수정
          </button>
        </div>
      </div>
    </form>
  );
};

export default withRouter(UpdateUserInfo);
