export const initialState = {
  isLogin: false,
  isLoading: false,
  userinfo: {
    id: '',
    email: '',
    nickname: '',
    profileImage: '',
  },
  posts: [],
  categoryPosts: null,
  searchPosts: null,
  post: null,
  isLoginModalOpen: false,
  messageModal: {
    isModalOpen: false,
    content: '',
  },
};
