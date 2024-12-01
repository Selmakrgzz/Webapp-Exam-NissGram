import React, { useState } from "react";
import PostDates from "./PostDates";
import { deleteComment, addComment } from "../../api/operations";
import API_URL from "./../../apiConfig";
import PostActions from "./PostActions";

interface Comment {
  commentId: number;
  text: string;
  dateCommented: string;
  user: {
    userName: string;
    profilePicture: string;
  };
}

interface PostPopupProps {
  postId: number;
  user: {
    userName: string;
    profilePicture: string;
    id: number;
  };
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
  onClose: () => void;
  onCommentClick: () => void;
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
  onCommentClick,
}) => {
  const [newComment, setNewComment] = useState('');
  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;
    const result = await addComment({
      postId: postId,
      text: newComment,
      username: user.userName, // This should match the backend expected field
      dateCommented: new Date().toISOString(),
    });

    console.log(newComment, user.userName, new Date().toISOString(),)

    if (result.error) {
      console.error('Failed to add comment:', result.error);
    } else {
      setNewComment('');
      // Push new comment to comments array to update UI
      comments.push({
        commentId: result.commentId, // Make sure your API returns the new ID
        text: newComment,
        dateCommented: new Date().toISOString(),
        user: { userName: user.userName, profilePicture: user.profilePicture }
      });
      // Call any additional state updates or side-effects here
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const result = await deleteComment(commentId);
    if (result.error) {
      console.error('Failed to delete comment:', result.error);
    } else {
      // Filter out the deleted comment from the local state to update UI
      const updatedComments = comments.filter(comment => comment.commentId !== commentId);
      comments = updatedComments; // Assuming this updates your state correctly
    }
  };

  return (
    <div className="post-popup modal-body d-flex">

      {/* left */}
      <div className="left pe-3 ">
        {imgUrl ? (
              <img
                src={imgUrl.startsWith('/images/postImages') ? `${API_URL}${imgUrl}` : `http://localhost:5024${imgUrl}`}
                alt="Post image"
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "400px" }}
              />
            ): (
              <p className="font-italic">{text}</p>
            )}
        <div>


        <div className="likes-comments-dates">
          LIKES OG KMR            
            <div className="postedDateModal">
              <PostDates dateCreated={dateCreated} dateUpdated={dateUpdated}/>
            </div>
        </div>
      </div>
    </div>


      {/* right */}
      <div className="right">
        <h5 className="mb-3">{imgUrl ? " " : "Note"}</h5>
          
        <h6> Comments </h6>
        {comments.map((comment) => (
          <div key={comment.commentId} className="comment">
            <span>{comment.user.userName}: </span>
            <span>{comment.text}</span>
            {user.userName === comment.user.userName && (
              <button className="btn btn-link text-danger p-0" onClick={() => handleDeleteComment(comment.commentId)}>
                <i className="fas fa-trash-alt"> </i>
              </button>
            )}
          </div>
        ))}

        {/* add*/}
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAddComment(e);
        }}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostPopup;
