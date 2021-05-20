import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import Goole_login from './components/Goole_login';
import UpdateUserInfo from './components/UpdateUserInfo';
import UserInfo from './components/UserInfo';
// import App1 from './components/App1';

const App = () => {
  const loginInfo = useSelector((state) => state.userReducer);
  const { isLogin, userinfo } = loginInfo;

  const postInfo = useSelector((state) => state.postReducer);
  const { posts } = postInfo;

  return (
    <div className="App">
      <Switch>
        <Route exact path="/main" render={() => <Main />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <Signup />} />
        <Route exact path="/updateUserInfo" render={() => <UpdateUserInfo />} />
        <Route exact path="/userInfo" render={() => <UserInfo />} />
        <Route exact path="/goole_login" render={() => <Goole_login />} />
        {/* <Route exact path="/App1" render={() => <App1 />} /> */}
      </Switch>
    </div>
  );
};

export default withRouter(App);
