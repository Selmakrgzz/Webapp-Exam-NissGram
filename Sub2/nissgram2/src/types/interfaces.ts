export interface User {
  userName: string; // Changed to match camelCase from the returned data
  profilePicture: string;
  about: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Comment {
  commentId: number;
  text: string;
  dateCommented: string;
  user: User;
}

export interface Post {
  postId: number;
  imgUrl: string;
  text: string;
  dateCreated: Date;
  dateUpdated: Date;
  user: User;
  userLiked: boolean;
  likeCount: number;
  commentCount: number;
}

export interface PostDetails extends Post {
  comments: Comment[];
}

export interface PostPopupProps {
  post: PostDetails; // Use PostDetails as a single object
  onClose: () => void; // Callback to close the modal
}
