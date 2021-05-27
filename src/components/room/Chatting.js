import React from 'react';
import ChattingMe from './ChattingMe';
import ChattingYou from './ChattingYou';
const data = [
  {
    id: 1,
    userId: 1,
    nickname: '태규',
    profileImage: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
    content: 'ㅎ안녕하세요',
    image: '',
    createdAt: '2021~~',
  },
  {
    id: 2,
    userId: 2,
    nickname: '주현',
    profileImage: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
    content: '책주세요',
    image: '',
    createdAt: '2021~~',
  },
  {
    id: 3,
    userId: 1,
    nickname: '태규',
    profileImage: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
    content: '바이',
    image: '',
    createdAt: '2021~~',
  },
];

function Chatting({ id }) {
  const userId = 1;

  return (
    <>
      {data.map((chat) => {
        if (userId === chat.userId) {
          return <ChattingMe chat={chat} key={chat.id} />;
        } else {
          return <ChattingYou chat={chat} key={chat.id} />;
        }
      })}
    </>
  );
}

export default Chatting;
