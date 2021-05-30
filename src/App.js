import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Foother from './components/Foother';
import Nav from './components/Nav';
import Main from './pages/Main';
import UpdateUserInfo from './pages/UpdateUserInfo';
import Mypage from './pages/Mypage';
import SearchResult from './pages/SearchResult';
import PostDetail from './pages/PostDetail';
import Rooms from './pages/RoomListPage';
import Chatting from './pages/ChattingPage';
import PostForm from './pages/PostForm';

import { setCategoryPosts, setSearchPosts } from './actions/index';

import LoginModal from './components/LoginModal';
import MessageModal from './components/MessageModal';
import LoadingIndicator from './components/LoadingIndicator';

const App = () => {
  const loginInfo = useSelector((state) => state.userReducer);
  const { isLogin, userinfo, isLoginModalOpen, messageModal } = loginInfo;

  const postInfo = useSelector((state) => state.postReducer);
  const { posts, categoryPosts, searchPosts, post, isLoading } = postInfo;

  const dispatch = useDispatch();

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
      <LoadingIndicator isLoading={isLoading} />
      <MessageModal
        isOpen={messageModal.isModalOpen}
        content={messageModal.content}
      />
      <LoginModal isOpen={isLoginModalOpen} />
      <Nav
        isLogin={isLogin}
        profileImage={userinfo.profileImage}
        getDefaultPosts={getDefaultPosts}
      />
      <Switch>
        <Route
          exact
          path="/updateUserInfo"
          render={() => <UpdateUserInfo userinfo={userinfo} />}
        />
        <Route
          exact
          path="/mypage"
          render={() => <Mypage isLogin={isLogin} userinfo={userinfo} />}
        />
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
        <Route
          exact
          path="/post"
          render={() => (
            <PostDetail post={post} isLogin={isLogin} userId={userinfo.id} />
          )}
        />
        <Route path="/rooms" component={Rooms} exact />
        <Route path="/rooms/:id" component={Chatting} />
        <Route
          exact
          path="/post-edit"
          render={() => <PostForm post={post} />}
        />
        <Route
          exact
          path="/post-create"
          render={() => <PostForm post={post} />}
        />
      </Switch>
      <Foother />
    </div>
  );
};

export default withRouter(App);
