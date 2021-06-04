import React from 'react';
import RoomContainer from '../containers/RoomContainer';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 680px;
`;

function RoomListPage() {
  return (
    <Container>
      <RoomContainer />
    </Container>
  );
}

export default RoomListPage;
