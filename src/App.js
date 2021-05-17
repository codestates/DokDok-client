import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';

const App = () => {
  const loginInfo = useSelector((state) => state.userReducer);
  const { isLogin, userinfo } = loginInfo;

  const postInfo = useSelector((state) => state.postReducer);
  const { posts } = postInfo;

  return (
    <div className="App">
      <Switch>
        <Route exact path="/main" render={() => <Main />} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
