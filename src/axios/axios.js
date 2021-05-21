import axios from 'axios';

export default function axiosSetUp() {
  axios.defaults.withCredentials = true;
  //   axios.interceptors.response.use(
  //     (response) => {
  //       return response;
  //     },
  //     async (error) => {
  //       const {
  //         config,
  //         response: { status },
  //       } = error;
  //       if (status === 401) {
  //         if (error.response.data === 'Access token expired') {
  //           // 기존 요청 정보 저장
  //           const originalRequest = config;

  //           // 액세스 토큰 요청
  //           await axios
  //             .get(process.env.REACT_APP_API_URL + '/user/accesstoken')
  //             .then((res) => {
  //               localStorage.setItem('accessToken', res.data.data.access_token);
  //             })
  //             .catch((err) => {
  //               if (err) throw err;
  //             });

  //           // 새로 받은 액세스 토큰 헤더에 설정
  //           axios.defaults.headers.common.Authorization = `Bearer ${localStorage.accessToken}`;
  //           originalRequest.headers.Authorization = `Bearer ${localStorage.accessToken}`;

  //           // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
  //           return axios(originalRequest);
  //         }
  //       }
  //       return Promise.reject(error);
  //     },
  //   );
}
