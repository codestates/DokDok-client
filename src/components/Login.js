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
        dispatch(setUserinfo(response.data.user));
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
        className="logo-full"
        style={{ backgroundImage: `url(${'images/dokdok-logo-full.png'})` }}
      />

      <form className="login-input-box" onSubmit={handleSubmit(onSubmit)}>
        <p className="p-group">Email</p>
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

        <p className="p-group">Password</p>
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

        <button className="login-btn btn" type="submit">
          Login
        </button>
        <div className="signup-select-area">
          <label>Don't have an account?</label>

          <span onClick={changeSelect}>Signup</span>
        </div>
      </form>
      <div className="social-login">
        <div
          className="btn-social-login"
          style={{ backgroundImage: `url(${'images/social-login-kakao.png'})` }}
          onClick={kakaoLogin}
        />
        <div
          className="btn-social-login"
          style={{
            backgroundImage: `url(${'images/social-login-google.png'})`,
          }}
          onClick={googleLogin}
        />
        <div
          className="btn-social-login"
          style={{ backgroundImage: `url(${'images/social-login-naver.png'})` }}
          onClick={naverLogin}
        />
      </div>
    </div>
  );
};

export default withRouter(Login);
