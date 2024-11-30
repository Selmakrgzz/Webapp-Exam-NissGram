import React, { useState } from "react";
import PostDates from "./PostDates";
import PostActions from "./PostActions";

interface User {
  userName: string;
  profilePicture: string;
}

interface Comment {
  commentId: number;
  text: string;
  dateCommented: string; // Format: "dd.MM.yy | HH:mm"
  user: User;
}

interface PostPopupProps {
  postId: number;
  user: User;
  imgUrl?: string;
  text: string;
  dateCreated: Date;
  dateUpdated: Date;
  comments: Comment[];
  userLiked: boolean;
  likeCount: number;
  commentCount: number;
  onLike: () => void;
  onAddComment: (text: string) => void;
  onDeleteComment: (commentId: number) => void;
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
}) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div
      className="modal fade"
      id={`postModal-${postId}`}
      tabIndex={-1}
      aria-labelledby={`postModalLabel-${postId}`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <a
              href={`/user/${user.userName}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div className="d-flex align-items-center">
                <img
                  src={user.profilePicture}
                  alt="Profile Picture"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
                <h5 className="modal-title mb-0" id={`postModalLabel-${postId}`}>
                  {user.userName}
                </h5>
              </div>
            </a>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body d-flex">
            <div className="left pe-3">
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt="Post Image"
                  className="img-fluid rounded mb-3"
                />
              ) : (
                <p className="font-italic">{text}</p>
              )}
              <div className="likes-comments-dates">
                <PostActions
                  postId={postId}
                  userLiked={userLiked}
                  likeCount={likeCount}
                  commentCount={commentCount}
                  onLike={onLike}
                  onCommentClick={() => {}}
                />
                <div className="postedDateModal">
                  <PostDates
                    dateCreated={dateCreated}
                    dateUpdated={dateUpdated}
                  />
                </div>
              </div>
            </div>

            <div className="right">
              <h5 className="mb-3">{imgUrl ? text : "Note"}</h5>
              <h6>Comments</h6>
              {comments.length > 0 ? (
                <ul
                  className="list-group"
                  style={{
                    maxHeight: "23rem",
                    overflowY: "auto",
                    width: "100%",
                  }}
                >
                  {comments.map((comment) => (
                    <li
                      key={comment.commentId}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div className="d-flex align-items-center mb-2">
                          <img
                            src={comment.user.profilePicture}
                            alt="Comment User Picture"
                            className="rounded-circle"
                            style={{
                              width: "30px",
                              height: "30px",
                              marginRight: "10px",
                            }}
                          />
                          <strong>{comment.user.userName}</strong>
                        </div>
                        <p>{comment.text}</p>
                        <small className="text-muted">
                          {comment.dateCommented}
                        </small>
                      </div>
                      <button
                        className="btn btn-link text-danger p-0"
                        onClick={() => onDeleteComment(comment.commentId)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
              <div className="input-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
                <button className="btn btn-primary" onClick={handleAddComment}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
