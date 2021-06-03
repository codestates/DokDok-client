import React, { useEffect } from 'react';
import Rooms from '../components/room/Rooms';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../reducers/chattingReducer';

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
      <div>
        <img src="https://i.imgur.com/K5RdjzR.png" alt="" />
      </div>
    );
  return (
    <div>
      <Rooms data={data} />
    </div>
  );
}

export default RoomContainer;
