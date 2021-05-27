import React from 'react';

function ChattingYou({ chat }) {
  return (
    <div>
      {chat.nickname} : {chat.content}
    </div>
  );
}

export default ChattingYou;
