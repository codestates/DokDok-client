import axios from 'axios';
const URI = process.env.REACT_APP_API_URL;

export const getRoomList = async () => {
  const response = await axios.get(`${URI}/rooms`, {
    withCredentials: true,
  });
  //console.log(response.data);
  return response.data.data;
};

export const createRoom = async (opponentId) => {
  try {
    const response = await axios.post(
      `${URI}/rooms`,
      {
        opponentId,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    return error;
  }
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
  console.log(response.data.data);
  return response.data.data;
};
