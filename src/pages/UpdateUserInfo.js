import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUserinfo } from '../actions';
//import '../scss/UpdateUserInfo.scss';
//이메일 받기  닉네임 유효성
const UpdateUserInfo = ({ userinfo, history }) => {
  let profileImage = userinfo.profileImage;

const dispatch = useDispatch();

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    
    //악시오스
    const frm = new FormData()
    frm.append('nickname', data.nickname);
    frm.append('password', data.password);
    frm.append('profileImage', file);
    axios
      .patch(process.env.REACT_APP_API_URL + '/users', frm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then(function (res) {
        console.log(res)
        console.log('수정완료');
        dispatch(setUserinfo(res.data.user))
        history.push('/mypage')
      })
      .catch(function (err) {
        console.log(err);
      });
    reset();
  };

  //버튼클릭시 인풋박스
  const [nickName, setNickName] = useState(userinfo.nickname);
  const [isNickNameVisible, setIsNickNameVisible] = useState(false);

  const changeNickName = (e) => {
    setNickName(e.target.value);
  };

  const changeNickNameVisible = () => {
    setIsNickNameVisible(!isNickNameVisible);
  };

  const [passWord, setPassWord] = useState();
  const [isPassWordVisible, setisPassWordVisible] = useState(false);

  const changePassWord = (e) => {
    setPassWord(e.target.value);
  };
  const changePassWordVisible = () => {
    setisPassWordVisible(!isPassWordVisible);
  };

  //이미지미리보기

  const [previewImg, setPreviewImg] = useState(null);
  const [file, setFile] = useState();
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
            src={
              previewImg
                ? previewImg
                : 'https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif'
            }
            className="img"
          ></img>
        </label>

        <div className="user-info">
          <div>이메일 {userinfo.email}</div>

          <div>닉네임</div>
          {isNickNameVisible ? (
            <label className="input-box-nickname">
              <input
                // value={nickName}
                placeholder={nickName}
                type="text"
                onChange={changeNickName}
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
                value={passWord}
                type="password"
                onChange={changePassWord}
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
        </div>
      </div>
    </form>
  );
};

export default withRouter(UpdateUserInfo);
