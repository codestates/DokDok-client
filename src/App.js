import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Foother from './components/Foother';
import Nav from './components/Nav';
import Main from './pages/Main';
import SearchResult from './pages/SearchResult';

import { setCategoryPosts, setPosts } from './actions/index';

import { mockPosts } from './fakeData/mockPosts';

const App = () => {
  const loginInfo = useSelector((state) => state.userReducer);
  const { isLogin, userinfo } = loginInfo;

  const postInfo = useSelector((state) => state.postReducer);
  const { posts, categoryPosts } = postInfo;

  const dispatch = useDispatch();

  useEffect(() => getPosts(), []);

  const getPosts = () => {
    dispatch(setPosts(mockPosts));
  };

  const getDefaultPosts = () => {
    dispatch(setCategoryPosts(null));
  };

  return (
    <div className="App">
      <Nav
        isLogin={isLogin}
        profileImage={userinfo.profileImage}
        getDefaultPosts={getDefaultPosts}
      />
      <Switch>
        <Route
          path="/main"
          render={() => (
            <Main
              posts={categoryPosts ? categoryPosts : posts}
              getDefaultPosts={getDefaultPosts}
            />
          )}
        />
        <Route exact path="/search" render={() => <SearchResult />} />
      </Switch>
      <Foother />
    </div>
  );
};

export default withRouter(App);
