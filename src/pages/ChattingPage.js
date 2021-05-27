import React from 'react';
import ChattingContainer from '../containers/ChattingContainer';
import ChattingInputContainer from '../containers/ChattingInputContainer';
function ChattingPage({ match }) {
  const { params } = match;
  return (
    <>
      <ChattingContainer id={params.id} />
      <ChattingInputContainer id={params.id} />
    </>
  );
}

export default ChattingPage;
