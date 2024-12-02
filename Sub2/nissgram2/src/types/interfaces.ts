export interface User {
  userName: string; 
  profilePicture: string;
  about?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}
export interface UserProfile {
  username: string;
  pictureCount: number;
  noteCount: number;
  about?: string;
  profilePicture?: string;
  pictures: Post[]; // Array of Post objects
  notes: Post[]; // Array of Post objects
  likedPosts: Post[]; // Array of Post objects
}

export interface SimpleUser {
  userName: string; 
  profilePicture: string;
}

export interface Comment {
  commentId: number;
  text: string;
  dateCommented: string;
  user: SimpleUser;
}

export interface Post {
  postId: number;
  imgUrl: string;
  text: string;
  dateCreated: Date;
  dateUpdated: Date;
  simpleUser: SimpleUser;
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
