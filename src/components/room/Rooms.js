import React from 'react';
import RoomItem from './RoomItem';

function Rooms() {
  return (
    <div>
      채팅 리스트
      <ul>
        <li>채팅방1</li>
        <li>채팅방2</li>
        <li>
          <RoomItem />
        </li>
      </ul>
    </div>
  );
}

export default Rooms;
