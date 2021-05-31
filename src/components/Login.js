import '../scss/Login.scss';
import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  setIsLogin,
  setLoginModal,
  setMessageModal,
  setUserinfo,
} from '../actions/index';

const Login = ({ changeSelect }) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          password: data.password,
          email: data.email,
        },
        {
          'Content-Type': 'application/json',
        },
      )
      .then(function (response) {
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(setIsLogin(true));
        if (response.data.user.profileImage === null) {
          dispatch(
            setUserinfo({
              ...response.data.user,
              profileImage: 'default-profile-picture_150.jpg',
            }),
          );
        } else {
          dispatch(setUserinfo(response.data.user));
        }
        dispatch(setLoginModal(false));
      })
      .catch(function (err) {
        if (err.response.data.message === 'Invalid password') {
          dispatch(setMessageModal(true, '비밀번호가 일치하지 않습니다.'));
        }
        if (err.response.data.message === 'not exisit user') {
          dispatch(setMessageModal(true, '가입되어 있는 이메일이 아닙니다.'));
        }
        if (err) throw err;
      });
    reset();
  };

  const kakaoLogin = () => {
    window.location.assign(
      `${process.env.REACT_APP_API_URL}/users/kakao/login`,
    );
  };

  const naverLogin = () => {
    window.location.assign(
      `${process.env.REACT_APP_API_URL}/users/naver/login`,
    );
  };

  const googleLogin = () => {
    window.location.assign(
      `${process.env.REACT_APP_API_URL}/users/google/login`,
    );
  };

  return (
    <div className="login-box">
      <div
        className="login-logo-full"
        style={{ backgroundImage: `url(${'dokdok-logo-full.png'})` }}
      />

      <h1>Login</h1>

      <form className="login-input-box" onSubmit={handleSubmit(onSubmit)}>
        <p id="p-group">Email</p>
        <label className="input-box">
          <input
            placeholder="email"
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '잘못된 이메일 형식입니다.',
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>

        <p id="p-group">Password</p>
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

        <button className="login-btn" type="submit">
          Login
        </button>
        <div className="signup-select-area">
          <label>Don't have an account?</label>

          <span className="click-btn" onClick={changeSelect}>
            Signup
          </span>
        </div>
      </form>
      <div>
        <button className="btn-social-login" onClick={kakaoLogin}>
          <img src="kakao-login-btn.png"></img>
        </button>
        <button className="btn-social-login" onClick={googleLogin}>
          <img src="google-login-btn.png"></img>
        </button>
        <button className="btn-social-login" onClick={naverLogin}>
          <img src="naver-login-btn.png"></img>
        </button>
      </div>
    </div>
  );
};

export default withRouter(Login);
