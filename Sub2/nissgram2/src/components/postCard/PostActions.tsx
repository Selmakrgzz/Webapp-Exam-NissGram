import React from "react";
import API_URL from '../../apiConfig';

interface PostActionsProps {
  postId: number;
  userLiked: boolean;
  likeCount: number;
  commentCount: number;
  onLike: () => void;
  onCommentClick: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  userLiked,
  likeCount,
  commentCount,
  onLike,
  onCommentClick,
}) => {
  return (
    <div className="d-flex align-items-center">
      {/* Like Section */}
      <div className="d-flex align-items-center mr-3 like-button-container">
      <form>
        <button
          onClick={onLike}
          className="btn p-0"
          style={{ border: "none" }}
        >
          <img
            src={`${API_URL}/images/Icons/${userLiked ? 'heart-red' : 'heart'}.png`}
            alt="Like Icon"
            className="like-img me-2"
            style={{ marginLeft: "5px", width: "25px", height: "24px" }}
          />
        </button>
        <span>{likeCount}</span>
      </form>

      </div>

      {/* Comment Section */}
      <div
        className="d-flex align-items-center mr-3 comment-button-container"
        style={{ cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target={`#postModal-${postId}`} // Koble til riktig modal
      >
        <img
          src={`${API_URL}/images/Icons/chat.png`}
          alt="Comment Icon"
          className="comment_img"
        />
        <span style={{ marginLeft: "5px", width: "25px", height: "24px" }}>
          {commentCount}
        </span>
      </div>

    </div>
  );
};

export default PostActions;
