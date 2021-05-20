import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Foother from './components/Foother';
import Nav from './components/Nav';
import Main from './pages/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import Goole_login from './components/Goole_login';
import UpdateUserInfo from './components/UpdateUserInfo';
import UserInfo from './components/UserInfo';
// import App1 from './components/App1';
import SearchResult from './pages/SearchResult';

import { setCategoryPosts, setPosts, setSearchPosts } from './actions/index';

import { mockPosts } from './fakeData/mockPosts';
import PostDetail from './pages/PostDetail';

const App = () => {
  const loginInfo = useSelector((state) => state.userReducer);
  const { isLogin, userinfo } = loginInfo;

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
      <Nav
        isLogin={isLogin}
        profileImage={userinfo.profileImage}
        getDefaultPosts={getDefaultPosts}
      />
      <Switch>
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <Signup />} />
        <Route exact path="/updateUserInfo" render={() => <UpdateUserInfo />} />
        <Route exact path="/userInfo" render={() => <UserInfo />} />
        <Route exact path="/goole_login" render={() => <Goole_login />} />
        {/* <Route exact path="/App1" render={() => <App1 />} /> */}
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
