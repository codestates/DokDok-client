const { Kakao } = window;

export const KakaoLogin = (history) => {
  window.Kakao.Auth.login({
    success: (response) => {
      axios
        .get(`${kakaoAPI}/kakao`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: response.access_token,
          },
        })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          alert('로그인 되었습니다.');
          history.push('/');
        });
    },
    fail: (error) => {
      alert(JSON.stringify(error));
    },
  });
};
