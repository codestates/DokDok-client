import reduxStore from '../store/store';
import axios from 'axios';
import { setIsLogin } from '../actions';
const { dispatch } = reduxStore;

export default function axiosSetUp() {
  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        response: { status },
      } = error;
      if (status === 401 && error.response.data.message === 'Auth error') {
        dispatch(setIsLogin(false));
        localStorage.removeItem('accessToken');
      }
      return Promise.reject(error);
    },
  );
}
