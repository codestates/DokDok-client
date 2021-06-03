<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> 9acc4bcbea8db75021abde37e8153d4eb28c7204
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setMessageModal } from '../actions';
import '../scss/Inquire.scss';

<<<<<<< HEAD
const Inquire = ({ history }) => {
  const [email, setemail] = useState(false);
  const [title, settitle] = useState(false);
  const [content, setcontent] = useState(false);

=======
const Inquire = () => {
>>>>>>> 9acc4bcbea8db75021abde37e8153d4eb28c7204
  const dispatch = useDispatch();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
<<<<<<< HEAD
    console.log(data);
=======
>>>>>>> 9acc4bcbea8db75021abde37e8153d4eb28c7204
    if (!data.email && !data.title && !data.content) {
      dispatch(setMessageModal(true, '빈 항목을 작성해 주세요.'));
      return;
    }

    axios
      .post(
<<<<<<< HEAD
        `${process.env.REACT_APP_API_URL}/inquire`,
=======
        `${process.env.REACT_APP_API_URL}/inquires`,
>>>>>>> 9acc4bcbea8db75021abde37e8153d4eb28c7204
        {
          email: data.email,
          title: data.title,
          content: data.content,
        },
        {
          'Content-Type': 'application/json',
        },
      )
      .then(function () {
<<<<<<< HEAD
        dispatch(setMessageModal(true, '전송이 완료 되었습니다.'));
=======
        dispatch(setMessageModal(true, '전송이 완료되었습니다.'));
>>>>>>> 9acc4bcbea8db75021abde37e8153d4eb28c7204
      })
      .catch(function (err) {
        if (err) throw err;
      });
    reset();
  };

  return (
    <form className="lnquire" onSubmit={handleSubmit(onSubmit)}>
      <div className="lnquire-header">
        <i className="fas fa-pen fa-2x"></i>
        <h2>문의사항</h2>
      </div>
      <div className="lnquire-info-box">
        <div className="lnquire-info">
          <div>
            <p className="p-font">이메일</p>

            <input
              placeholder="이메일"
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: '잘못된 이메일 형식입니다.',
                },
              })}
            />
            {errors.email && <p className="err-m">{errors.email.message}</p>}

            <p className="p-font">제목</p>

            <input
              placeholder="제목"
              {...register('title', {
                required: '제목을 입력해주세요.',
                maxLength: {
                  value: 20,
                  message: '',
                },
              })}
            />
            {errors.title && <p className="err-m">{errors.title.message}</p>}

            <p className="p-font">내용</p>

            <textarea
              placeholder="문의내용"
              className="content-text"
              {...register('content', {
                required: '문의사항을 입력해주세요.',
                maxLength: {
                  value: 500,
<<<<<<< HEAD
                  message: '문의내용이 초과하셨습니다.',
=======
                  message: '500자까지 작성 가능합니다.',
>>>>>>> 9acc4bcbea8db75021abde37e8153d4eb28c7204
                },
              })}
            />
            {errors.nickcontent && (
              <p className="err-m">{errors.content.message}</p>
            )}
          </div>
          <button className="send-btn" type="submit">
            문의하기
          </button>
        </div>
      </div>
    </form>
  );
};

export default withRouter(Inquire);
<<<<<<< HEAD
//
=======
>>>>>>> 9acc4bcbea8db75021abde37e8153d4eb28c7204
