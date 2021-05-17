import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const loginInfo = useSelector((state) => state.userReducer);
  const { isLogin, userinfo } = loginInfo;

  const postInfo = useSelector((state) => state.postReducer);
  const { posts } = postInfo;

  return (
    <div>
      <p>hello world</p>
    </div>
  );
}

export default App;
