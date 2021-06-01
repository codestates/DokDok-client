import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChattingMe from './ChattingMe';
import ChattingYou from './ChattingYou';
// const data = [
//   {
//     id: 1,
//     userId: 1,
//     nickname: '태규',
//     profileImage: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
//     content: 'ㅎ안녕하세요',
//     image: '',
//     createdAt: '2021~~',
//   },
//   {
//     id: 2,
//     userId: 2,
//     nickname: '주현',
//     profileImage: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
//     content: '책',
//     image: '',
//     createdAt: '2021~~',
//   },
//   {
//     id: 3,
//     userId: 1,
//     nickname: '태규',
//     profileImage: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
//     content: '바이',
//     image: '',
//     createdAt: '2021~~',
//   },
// ];

function Chatting({ roomId, chatContent, data }) {
  const loginInfo = useSelector((state) => state.userReducer);
  const { userinfo } = loginInfo;
  console.log(data);
  return (
    <>
      {data &&
        data.map((chat, idx) => {
          if (chat.id === -1) {
            return <div>{chat.msg}</div>;
          } else if (userinfo.id === chat.UserId) {
            return <ChattingMe chat={chat} key={chat.id} />;
          } else {
            return <ChattingYou chat={chat} key={chat.id} />;
          }
        })}
      {chatContent.map((chat, idx) => {
        if (chat.id === -1) {
          return <div>{chat.msg}</div>;
        } else if (userinfo.id === chat.id) {
          return <ChattingMe chat={chat} key={idx} />;
        } else {
          return <ChattingYou chat={chat} key={idx} />;
        }
      })}
    </>
  );
}

export default Chatting;
