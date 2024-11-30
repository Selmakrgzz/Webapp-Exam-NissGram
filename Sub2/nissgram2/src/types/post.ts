import { User } from "./user";

export interface Post {
  postId: number;
  imgUrl?: string;
  text: string;
  dateCreated: Date;
  dateUpdated: Date;
  user: User; // Aligns with backend DTO
  userLiked: boolean; // Indicates if the user liked the post
  likeCount: number;
  commentCount: number;
  onLike: () => void; // Optional callbacks
  onCommentClick: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}
