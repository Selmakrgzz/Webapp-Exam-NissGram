import React from "react";

interface PostPopupProps {
  postId: number;
  user: { userName: string; profilePicture: string };
  imgUrl?: string;
  text: string;
  dateCreated: Date;
  dateUpdated: Date;
  comments: Array<{
    commentId: number;
    text: string;
    dateCommented: string;
    user: { userName: string; profilePicture: string };
  }>;
  userLiked: boolean;
  likeCount: number;
  commentCount: number;
  onLike: () => void;
  onAddComment: (text: string) => void;
  onDeleteComment: (commentId: number) => void;
  onClose: () => void; // Ny prop for å lukke popup
}

const PostPopup: React.FC<PostPopupProps> = ({
  postId,
  user,
  imgUrl,
  text,
  dateCreated,
  dateUpdated,
  comments,
  userLiked,
  likeCount,
  commentCount,
  onLike,
  onAddComment,
  onDeleteComment,
  onClose,
}) => {
  return (
    <div className="post-popup">
      <div className="modal-header">
        <h5 className="modal-title">Post Details</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        <div>
          {imgUrl && <img src={imgUrl} alt="Post" />}
          <p>{text}</p>
          <p>Likes: {likeCount}</p>
          <p>Comments: {commentCount}</p>
        </div>
        <div>
          {comments.map((comment) => (
            <div key={comment.commentId}>
              <p>{comment.text}</p>
              <button onClick={() => onDeleteComment(comment.commentId)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
