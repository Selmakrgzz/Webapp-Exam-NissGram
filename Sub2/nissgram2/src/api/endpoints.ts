export const User = {
  // UserAPI
  GET_USER_PROFILE: 'UserAPI/profile',
  GET_USER_PROFILE_BY_USERNAME: 'UserAPI/profile/{username}',
  GET_CURRENT_USER: 'UserAPI/current',
  UPDATE_USER_PROFILE: 'UserAPI/update',
  DELETE_USER: 'UserAPI/delete',
  LIKED_POSTS: 'UserAPI/LikedPosts'
};
export const Auth = {
  // AuthAPI
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  LOGOUT: 'auth/logout',
  isAuthenticated: 'auth/isauthenticated',
}
export const Comment = {
  // CommentAPI
  ADD_COMMENT: 'CommentAPI/add',
  DELETE_COMMENT: 'CommentAPI/delete/{id}',
}
export const Home = {
  // HomeAPI
  HOME_INDEX: 'HomeAPI/index',
}
export const Post = {
  // PostAPI
  GET_POST_DETAILS: 'PostAPI/details/{id}',
  CREATE_POST: 'PostAPI/create',
  DELETE_POST: 'PostAPI/delete/{id}',
  UPDATE_POST: 'PostAPI/update/{id}',
  LIKE_POST: 'PostAPI/like/{postId}',
}