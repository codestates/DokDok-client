import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRooms } from '../reducers/chattingReducer';
import RoomContainer from '../containers/RoomContainer';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 680px;
`;

function RoomListPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);
  return (
    <Container>
      <RoomContainer />
    </Container>
  );
}

export default RoomListPage;
