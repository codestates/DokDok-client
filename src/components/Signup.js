import '../scss/Signup.scss';
import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setMessageModal } from '../actions';

const Signup = ({ changeSelect }) => {
  const dispatch = useDispatch();
  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/signup`,
        {
          email: data.email,
          password: data.password,
          nickname: data.nickname,
        },
        {
          'Content-Type': 'application/json',
        },
      )
      .then(function () {
        dispatch(setMessageModal(true, '회원가입이 완료되었습니다.'));
        changeSelect();
      })
      .catch(function (err) {
        if (err.response.status === 409) {
          dispatch(setMessageModal(true, '이미 가입되어 있는 이메일입니다.'));
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
    <div className="signup-box">
      <div
        className="login-logo-full"
        style={{ backgroundImage: `url(${'dokdok-logo-full.png'})` }}
      />

      <h1>Signup</h1>

      <form className="signup-input-box" onSubmit={handleSubmit(onSubmit)}>
        <p id="p-group">Email</p>
        <label className="input-box">
          <input
            className="input-box-fant"
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

        <p id="p-group">Nickname</p>
        <label className="input-box">
          <input
            placeholder="nickname"
            {...register('nickname', {
              required: '닉네임을 입력해주세요.',
              maxLength: {
                value: 10,
                message: '10자 미만으로 설정해주세요.',
              },
            })}
          />
          {errors.nickname && <p>{errors.nickname.message}</p>}
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

        <p id="p-group">Confirm Password</p>
        <label className="input-box">
          <input
            placeholder="confirm password"
            type="password"
            {...register('confirm_password', {
              required: '비밀번호를 다시 입력해주세요.',
              validate: (value) =>
                value === watch('password') || '비밀번호가 일치하지 않습니다',
            })}
          />
          {errors.confirm_password && <p>{errors.confirm_password.message}</p>}
        </label>

        <button className="signup-btn" type="submit">
          Signup
        </button>
      </form>

      <div className="login-select-area">
        <label>You have an account?</label>
        <span className="click-btn" onClick={changeSelect}>
          Login
        </span>
      </div>
    </div>
  );
};

export default withRouter(Signup);
