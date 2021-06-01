import reduxStore from '../store/store';
import axios from 'axios';
import { setIsLoading, setIsLogin, setUserinfo } from '../actions';
const { dispatch } = reduxStore;

export default function axiosSetUp() {
  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
    (response) => {
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 1000);
      return response;
    },
    async (error) => {
      const {
        response: { status },
      } = error;
      if (
        status === 401 &&
        error.response.data.error.name === 'TokenExpiredError'
      ) {
        dispatch(setIsLogin(false));
        dispatch(setUserinfo({}));
        localStorage.removeItem('accessToken');
      }
      dispatch(setIsLoading(false));
      return Promise.reject(error);
    },
  );
}
