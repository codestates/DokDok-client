import React from 'react';

function ChattingMe({ chat }) {
  return (
    <div>
      {chat.nickname} : {chat.content}
    </div>
  );
}

export default ChattingMe;
