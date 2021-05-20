import '../scss/Login.scss';
import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setIsLogin, setUserinfo } from '../actions/index';

const Login = ({ loginBtn, signupBtn, history }) => {
  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);

    //악시오스 로그인 요청
    axios
      .post(
        process.env.REACT_APP_API_URL + '/users/login',
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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    reset();
  };
  return (
    <div className="loginBox">
      <h2>로고</h2>
      <h1>Login</h1>

      <form className="login-input-box" onSubmit={handleSubmit(onSubmit)}>
        <div>Email</div>
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
        <p></p>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>

      <div className="signup-btn-area">
        <label>Don't have an account?</label>

        <button className="signup-btn" onClick={() => history.push('/signup')}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default withRouter(Login);
