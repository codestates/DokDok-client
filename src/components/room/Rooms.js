import React from 'react';
import RoomItem from './RoomItem';

function Rooms({ data }) {
  return (
    <div>
      {data.map((room) => (
        <RoomItem key={room.roomId} room={room} />
      ))}
    </div>
  );
}

export default Rooms;
