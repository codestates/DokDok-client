// import io from 'socket.io-client';
// const socket = io.connect(`${process.env.REACT_APP_API_URL}`);
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chatting from '../components/room/Chatting';
import ChattingInput from '../components/room/ChattingInput';
import styled from 'styled-components';
import { getChatData } from '../reducers/chattingReducer';

// 채팅페이지에 처음들어갈때에만 서버에서 뿌려주는걸로하고 그 이후 채팅페이지에서 대화하는건 클라단에서만 추가하기로 하는게 좋을듯?

const ChattingMessage = styled.div`
  height: 570px;
  overflow-y: auto;
`;

function ChattingContainer({ socket, roomId }) {
  const [message, setMessage] = useState('');
  const [msgList, setMsgList] = useState([]);
  const { loading, error, data } = useSelector(
    (state) => state.chattingReducer.chat,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatData(roomId));

    // 여기에다가 채팅목록 뿌려줘야됨 쿼리파라미터로 roomid다 가져와서
    //console.log(roomId);
    socket.on('onReceive', (msg) => {
      setMsgList((msgList) => [...msgList, msg]);
    });

    socket.on('onConnect', (msg) => {
      setMsgList((msgList) => [...msgList, msg]);
    });

    socket.on('onDisconnect', (msg) => {
      setMsgList((msgList) => [...msgList, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, dispatch]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit('onSend', message);
      setMessage('');
    },
    [message, socket],
  );

  const onMessageChange = useCallback(
    (e) => {
      setMessage(e.target.value);
    },
    [message],
  );

  const scrollRef = useRef();

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러</div>;
  if (!data) return <div>비었음</div>;

  return (
    <>
      <ChattingMessage>
        <Chatting
          roomId={roomId}
          chatContent={msgList}
          ref={scrollRef}
          data={data}
        />
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
