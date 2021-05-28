import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const ImgDiv = styled.div`
  flex: 0 0 70px;
  width: 70px;
  height: 70px;

  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ChatDiv = styled.div`
  margin-left: 1rem;
  .nickname {
    margin-left: 0.5rem;
    margin-top: 0.5rem;
  }
  .message {
    position: relative;
    padding: 1rem;
    background: #63e6be;
    border-radius: 10px;
  }
  .message:after {
    border-top: 15px solid #63e6be;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 10px;
    left: -15px;
  }
`;

function ChattingYou({ chat }) {
  return (
    <Container>
      <ImgDiv>
        <img
          src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMDdfMTYw/MDAxNTgxMDg1NzUxMTUy.eV1iEw2gk2wt_YqPWe5F7SroOCkXJy2KFwmTDNzM0GQg.Z3Kd5MrDh07j86Vlb2OhAtcw0oVmGCMXtTDjoHyem9og.JPEG.7wayjeju/%EB%B0%B0%EC%9A%B0%ED%94%84%EB%A1%9C%ED%95%84%EC%82%AC%EC%A7%84_IMG7117.jpg?type=w800"
          alt="모르는사람"
        />
      </ImgDiv>
      <ChatDiv>
        <div className="nickname">{chat.nickname}</div>
        <div className="message">{chat.content}</div>
      </ChatDiv>
    </Container>
  );
}

export default ChattingYou;
