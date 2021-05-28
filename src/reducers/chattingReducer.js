import * as chattingAPI from '../lib/api/chatting';

const GET_ROOMS = 'GET_ROOMS';
const GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS';
const GET_ROOMS_ERROR = 'GET_ROOMS_ERROR';

const CREATE_ROOM = 'CREATE_ROOM';
const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR';

const DELETE_ROOM = 'DELETE_ROOM';
const DELETE_ROOM_SUCCESS = 'DELETE_ROOM_SUCCESS';
const DELETE_ROOM_ERROR = 'DELETE_ROOM_ERROR';

const GET_CHAT_DATA = 'GET_CHAT_DATA';
const GET_CHAT_DATA_SUCCESS = 'GET_CHAT_DATA_SUCCESS';
const GET_CHAT_DATA_ERROR = 'GET_CHAT_DATA_ERROR';

export const getRooms = () => async (dispatch) => {
  dispatch({ type: GET_ROOMS });
  try {
    const rooms = await chattingAPI.getRoomList();
    dispatch({ type: GET_ROOMS_SUCCESS });
  } catch (error) {
    dispatch({
      type: GET_ROOMS_ERROR,
      error,
    });
  }
};

const initailState = {};

export default function chattingReducer(state = initailState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {};
    case GET_ROOMS_SUCCESS:
      return {};
    case GET_ROOMS_ERROR:
      return {};
    default:
      return state;
  }
}
