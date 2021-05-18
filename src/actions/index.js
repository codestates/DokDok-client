// action types
export const SET_IS_LOGIN = 'SET_IS_LOGIN';
export const SET_USERINFO = 'SET_USERINFO';
export const SET_POSTS = 'SET_POSTS';
export const SET_CATEGORY_POSTS = 'SET_CATEGORY_POSTS';

// actions creator functions
export const setIsLogin = (isLogin) => {
  return {
    type: SET_IS_LOGIN,
    payload: {
      isLogin,
    },
  };
};

export const setUserinfo = (userinfo) => {
  return {
    type: SET_USERINFO,
    payload: {
      ...userinfo,
    },
  };
};

export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts,
  };
};

export const setCategoryPosts = (posts) => {
  return {
    type: SET_CATEGORY_POSTS,
    payload: posts,
  };
};
