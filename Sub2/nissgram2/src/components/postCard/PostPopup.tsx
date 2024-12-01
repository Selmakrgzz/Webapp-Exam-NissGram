import React, { useState } from "react";
import PostDates from "./PostDates";
import API_URL from "./../../apiConfig";
import { PostPopupProps } from "../../types/interfaces";
import { addComment, deleteComment } from "../../api/operations";

const PostPopup: React.FC<PostPopupProps> = ({ post, onClose }) => {
  const { postId, simpleUser, imgUrl, text, dateCreated, dateUpdated, userLiked, likeCount, commentCount, comments } = post;

  const [newComment, setNewComment] = useState<string>("");
  const [localComments, setLocalComments] = useState(comments);

  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    try {
      const result = await addComment({ postId, text: newComment });
      if (result.error) {
        console.error("Failed to add comment:", result.error);
        return;
      }

      setLocalComments((prevComments) => [
        ...prevComments,
        {
          commentId: result.commentId, // Use the returned comment ID
          text: newComment,
          dateCommented: new Date().toISOString(),
          user: { userName: simpleUser.userName, profilePicture: simpleUser.profilePicture },
        },
      ]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const result = await deleteComment(commentId.toString());
      if (result.error) {
        console.error("Failed to delete comment:", result.error);
        return;
      }

      setLocalComments((prevComments) => prevComments.filter((comment) => comment.commentId !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="post-popup modal-body d-flex">
      {/* Left Section */}
      <div className="left pe-3">
        {imgUrl ? (
          <img
            src={imgUrl.startsWith("/images/postImages") ? `${API_URL}${imgUrl}` : `http://localhost:5024${imgUrl}`}
            alt="Post image"
            className="img-fluid rounded mb-3"
            style={{ maxHeight: "400px" }}
          />
        ) : (
          <p className="font-italic">{text}</p>
        )}

        <div className="likes-comments-dates mt-3">
          <div className="d-flex justify-content-between">
            <span>{likeCount} Likes</span>
            <span>{commentCount} Comments</span>
          </div>
          <PostDates dateCreated={dateCreated} dateUpdated={dateUpdated} />
        </div>
      </div>

      {/* Right Section */}
      <div className="right">
        <h6>Comments</h6>
        {localComments.map((comment) => (
          <div key={comment.commentId} className="comment mb-2">
            <span>
              <strong>{comment.user.userName}</strong>: {comment.text}
            </span>
            {simpleUser.userName === comment.user.userName && (
              <button
                className="btn btn-link text-danger p-0 ms-2"
                onClick={() => handleDeleteComment(comment.commentId)}
              >
                <i className="fas fa-trash-alt" />
              </button>
            )}
          </div>
        ))}

        {/* Add Comment */}
        <form onSubmit={handleAddComment} className="mt-3">
          <div className="input-group">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostPopup;
