import axios from 'axios';
const URI = process.env.REACT_APP_API_URL;

export const getRoomList = async () => {
  const response = await axios.get(`${URI}/rooms`, {
    withCredentials: true,
  });
  return response.data;
};

export const createRoom = async () => {
  // body param -> id
  const response = await axios.post(
    `${URI}/rooms`,
    {
      //id :
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const deleteRoom = async (roomId) => {
  const response = await axios.patch(
    `${URI}/rooms`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const chatData = async (roomId) => {
  const response = await axios.get(`${URI}/chattings/${roomId}`, {
    withCredentials: true,
  });
  return response.data;
};
