import React, { useCallback } from 'react';
import ChattingInput from '../components/room/ChattingInput';
function ChattingInputContainer() {
  const onSubmit = useCallback((e) => {
    e.preventDefault();
  });

  return (
    <>
      <ChattingInput onSubmit={onSubmit} />
    </>
  );
}

export default ChattingInputContainer;
