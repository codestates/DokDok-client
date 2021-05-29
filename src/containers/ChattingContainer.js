import React, { useCallback, useState, useEffect } from 'react';
import Chatting from '../components/room/Chatting';
import ChattingInput from '../components/room/ChattingInput';
import io from 'socket.io-client';
import styled from 'styled-components';
const socket = io.connect(`${process.env.REACT_APP_API_URL}`);

// 채팅페이지에 처음들어갈때에만 서버에서 뿌려주는걸로하고 그 이후 채팅페이지에서 대화하는건 클라단에서만 추가하기로 하는게 좋을듯?

const ChattingMessage = styled.div`
  height: 680px;
  overflow-y: auto;
`;

function ChattingContainer({ id }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState('');
  useEffect(() => {
    socket.on('sendMessage', (msg) => {
      setChat(msg);
    });
  }, [chat]);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit('message', message);
      setMessage('');
    },
    [message],
  );

  const onMessageChange = useCallback(
    (e) => {
      setMessage(e.target.value);
    },
    [message],
  );

  return (
    <>
      <ChattingMessage>
        <Chatting id={id} chat={chat} />
      </ChattingMessage>
      <ChattingInput
        onSubmit={onSubmit}
        onMessageChange={onMessageChange}
        message={message}
      />
    </>
  );
}

export default ChattingContainer;
