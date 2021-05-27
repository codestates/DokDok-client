import React from 'react';
import Chatting from '../components/room/Chatting';
function ChattingContainer({ id }) {
  return (
    <>
      <Chatting id={id} />
    </>
  );
}

export default ChattingContainer;
