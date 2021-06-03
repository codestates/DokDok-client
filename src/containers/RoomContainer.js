import React, { useEffect } from 'react';
import Rooms from '../components/room/Rooms';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../reducers/chattingReducer';
import styled from 'styled-components';

const ImgDiv = styled.div`
  text-align: center;
`;

// Room List 불러오기
function RoomContainer() {
  const { loading, error, data } = useSelector(
    (state) => state.chattingReducer.rooms,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러</div>;
  if (!data)
    return (
      <ImgDiv>
        <img src="https://i.imgur.com/K5RdjzR.png" alt="" />
      </ImgDiv>
    );
  return (
    <div>
      <Rooms data={data} />
    </div>
  );
}

export default RoomContainer;
