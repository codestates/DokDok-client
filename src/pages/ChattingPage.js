import React from 'react';
import ChattingContainer from '../containers/ChattingContainer';
import styled from 'styled-components';

const Container = styled.div`
  height: 760px;
  margin-top: 1rem;
`;

function ChattingPage({ match }) {
  const { params } = match;
  return (
    <Container>
      <ChattingContainer id={params.id} />
    </Container>
  );
}

export default ChattingPage;
