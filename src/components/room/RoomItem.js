import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid pink;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
`;

const ImageContainer = styled.div`
  flex: 0 0 100px;
  width: 100px;
  height: 100px;

  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const NameDiv = styled.div`
  width: 70%;
  padding-left: 2rem;
  font-size: 1.2rem;
`;

const TimeDiv = styled.div`
  width: 20%;
  text-align: center;
  font-size: 1.2rem;
`;

function RoomItem({ room }) {
  return (
    <Container>
      <ImageContainer>
        <img src={room.img} />
      </ImageContainer>
      <NameDiv>
        <Link to={`/rooms/${room.roomId}`}>{room.name}</Link>
      </NameDiv>
      <TimeDiv>{room.time}</TimeDiv>
    </Container>
  );
}

export default RoomItem;
