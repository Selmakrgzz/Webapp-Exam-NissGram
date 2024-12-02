import React, { useState, useEffect } from 'react';
import PostDates from "./PostDates";
import API_URL from "./../../apiConfig";
import { PostPopupProps } from "../../types/interfaces";
import { addComment, deleteComment, fetchCurrentUser } from "../../api/operations";

const PostPopup: React.FC<PostPopupProps> = ({ post, onClose }) => {
  const { postId, imgUrl, text, dateCreated, dateUpdated, likeCount, commentCount, comments } = post;

  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);

  // Fetch the current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.error("Error fetching current user:", err);
        setError("Failed to fetch current user.");
      }
    };

    fetchUser();
  }, []);

  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    try {
      const result = await addComment({ postId, text: newComment });
      if (result.error) {
        setError("Failed to add comment: " + result.error);
        return;
      }
      onClose();
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("An error occurred while adding the comment.");
    }
    setNewComment("");
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const result = await deleteComment(commentId);
      if (result.success) {
        onClose();
      } else {
        setError("Failed to delete comment.");
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError("An error occurred while deleting the comment.");
    }
  };

  return (
    <div className="post-popup modal-body d-flex">
      <div className="left pe-3">
        {imgUrl && (
          <img
            src={`${API_URL}/images/postImages${imgUrl}`}
            alt="Post image"
            className="img-fluid rounded mb-3"
            style={{ maxHeight: "400px" }}
          />
        )}
        <PostDates dateCreated={dateCreated} dateUpdated={dateUpdated} />
        <p>{likeCount} Likes</p>
        <p>{commentCount} Comments</p>
      </div>

      <div className="right">
        <h6>Comments</h6>
        {comments.map((comment) => (
          <div key={comment.commentId} className="d-flex align-items-center mb-2">
            <strong>{post.simpleUser?.userName || "Unknown"}:</strong> {comment.text}
            {post.simpleUser?.userName === currentUser?.username && (
              <button onClick={() => handleDeleteComment(comment.commentId)} className="btn btn-link text-danger p-0">
                <i className="fas fa-trash-alt"></i>
              </button>
            )}
          </div>
        ))}
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button className="btn btn-primary" type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostPopup;
