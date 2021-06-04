import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChattingContainer from '../containers/ChattingContainer';
import styled from 'styled-components';
import socketIOClient from 'socket.io-client';

const Container = styled.div`
  height: 680px;
  padding-top: 1rem;
`;

function ChattingPage({ match }) {
  const { params } = match;
  const loginInfo = useSelector((state) => state.userReducer);
  const { userinfo } = loginInfo;

  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(socketIOClient(`${process.env.REACT_APP_API_URL}`));
  }, []);
  if (currentSocket) {
    currentSocket.on('connect', () => {
      currentSocket.emit('join', { roomId: params.id, userinfo });
    });
  }

  return (
    <Container>
      {currentSocket ? (
        <ChattingContainer socket={currentSocket} roomId={params.id} />
      ) : (
        <div>로딩중</div>
      )}
    </Container>
  );
}

export default ChattingPage;
