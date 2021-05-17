import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import Foother from './components/Foother';
import Nav from './components/Nav';
import Main from './pages/Main';
import SearchResult from './pages/SearchResult';

const App = () => {
  const loginInfo = useSelector((state) => state.userReducer);
  const { isLogin, userinfo } = loginInfo;

  const postInfo = useSelector((state) => state.postReducer);
  const { posts } = postInfo;

  return (
    <div className="App">
      <Nav isLogin={isLogin} profileImage={userinfo.profileImage} />
      <Switch>
        <Route exact path="/main" render={() => <Main posts={posts} />} />
        <Route exact path="/search" render={() => <SearchResult />} />
      </Switch>
      <Foother />
    </div>
  );
};

export default withRouter(App);
