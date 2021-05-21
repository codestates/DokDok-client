import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import axios from 'axios';

import Foother from './components/Foother';
import Nav from './components/Nav';
import Main from './pages/Main';
import UpdateUserInfo from './pages/UpdateUserInfo';
import UserInfo from './pages/UserInfo';
import SearchResult from './pages/SearchResult';
import PostDetail from './pages/PostDetail';

import { setCategoryPosts, setPosts, setSearchPosts } from './actions/index';

import { mockPosts } from './fakeData/mockPosts';
import LoginModal from './components/LoginModal';

const App = () => {
  const loginInfo = useSelector((state) => state.userReducer);
  const { isLogin, userinfo, isLoginModalOpen } = loginInfo;

  const postInfo = useSelector((state) => state.postReducer);
  const { posts, categoryPosts, searchPosts, post } = postInfo;

  const dispatch = useDispatch();

  useEffect(() => getPosts(), []);

  async function getPosts() {
    // await axios
    //   .get(`${process.env.REACT_APP_API_URL}/posts`)
    //   .then((res) => {
    //     dispatch(setPosts(res.data.posts));
    //   })
    //   .catch((err) => {
    //     if (err) throw err;
    //   });

    dispatch(setPosts(mockPosts));
  }

  const getDefaultPosts = () => {
    if (categoryPosts) {
      dispatch(setCategoryPosts(null));
    }

    if (searchPosts) {
      dispatch(setSearchPosts(null));
    }
  };

  return (
    <div className="App">
      <LoginModal isOpen={isLoginModalOpen} />
      <Nav
        isLogin={isLogin}
        profileImage={userinfo.profileImage}
        getDefaultPosts={getDefaultPosts}
      />
      <Switch>
        <Route exact path="/updateUserInfo" render={() => <UpdateUserInfo />} />
        <Route exact path="/userInfo" render={() => <UserInfo />} />
        <Route
          path="/main"
          render={() => (
            <Main
              posts={categoryPosts ? categoryPosts : posts}
              getDefaultPosts={getDefaultPosts}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchResult
              searchPosts={categoryPosts ? categoryPosts : searchPosts}
            />
          )}
        />
        <Route exact path="/post" render={() => <PostDetail post={post} />} />
      </Switch>
      <Foother />
    </div>
  );
};

export default withRouter(App);
