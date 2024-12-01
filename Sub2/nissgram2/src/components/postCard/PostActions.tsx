import React, { useState } from "react";
import API_URL from "../../apiConfig";
import { Modal } from 'react-bootstrap';
import PostPopup from "./PostPopup";
import PostProfileHeader from "./PostProfileHeader";
import '../../styles/popUp.css';
import { useEffect } from "react";

interface PostActionsProps {
  postId: number;
  user: {
    id: number;
    userName: string;
    profilePicture: string;
  };
  imgUrl: string;
  text: string;
  dateCreated: Date;
  dateUpdated: Date;
  comments: Array<{
    commentId: number;
    text: string;
    dateCommented: string;
    user: {
      userName: string;
      profilePicture: string;
    };
  }>;
  userLiked: boolean;
  likeCount: number;
  commentCount: number;
  onLike: () => void;
  onAddComment: (text: string) => void;
  onDeleteComment: (commentId: number) => void;
  onCommentClick: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  user,
  imgUrl,
  text,
  dateCreated,
  dateUpdated,
  comments,
  userLiked: initialUserLiked,
  likeCount: initialLikeCount,
  commentCount,
  onLike,
  onAddComment,
  onDeleteComment,
  onCommentClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const [userLiked, setUserLiked] = useState(initialUserLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hent status fra backend
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5024/api/PostAPI/details/${postId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch like status.");
        }

        const data = await response.json();
        setUserLiked(data.userLiked);
        setLikeCount(data.likeCount);
      } catch (error: any) {
        console.error("Error fetching like status:", error);
        setError("Failed to load like status.");
      }
    };
      fetchLikeStatus();
  }, [postId]);

  const handleLike = async () => {
    try {
      const newLikedState = !userLiked;
      setUserLiked(newLikedState);
      setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

      // Send like til backend
      const response = await fetch(`http://localhost:5024/api/PostAPI/like/${postId}`, {
        method: "POST",
        credentials: "include", // Inkluderer autentiseringstoken
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to update like status.");
      }

      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error: any) {
      console.error("Error updating like status:", error);

      // Tilbakestill state ved feil
      setUserLiked(!userLiked);
      setLikeCount((prev) => (userLiked ? prev + 1 : prev - 1));
      setError("An error occurred while updating your like.");
    }
  };


  return (
    <div className="d-flex align-items-center">
      {error && <div className="text-danger">{error}</div>}

      <div className="d-flex align-items-center mr-3 like-button-container">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLike();
          }}
          className="btn p-0"
          style={{ border: "none", background: "transparent" }}
        >
          <img
            src={`${API_URL}/images/Icons/${userLiked ? "heart-red" : "heart"}.png`}
            alt="Like Icon"
            className="like-img me-2"
            style={{ marginLeft: "5px", width: "25px", height: "24px" }}
          />
        </button>
        <span>{likeCount}</span>
      </div>

      <button onClick={toggleModal} className="btn comment-button-container">
        <img src={`${API_URL}/images/Icons/chat.png`} alt="Comment Icon" />
        <span>{commentCount}</span>
      </button>

      <Modal show={showModal} onHide={toggleModal} centered className="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>
          <PostProfileHeader 
              profilePicture={user?.profilePicture || `${API_URL}/images/default-profile.png`}
              userName={user?.userName || "Unknown"}
              userProfileLink={`/user/${user?.userName || "unknown"}`}
          /> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
        <PostPopup
          postId={postId}
          user={user} // Ensure this matches the expected structure in PostPopupProps
          imgUrl={imgUrl}
          text={text}
          dateCreated={dateCreated}
          dateUpdated={dateUpdated}
          comments={comments}
          userLiked={userLiked}
          likeCount={likeCount}
          commentCount={commentCount}
          onLike={onLike}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
          onClose={toggleModal} // Ensure onClose is expecting a function
          onCommentClick={onCommentClick}
        />
        </Modal.Body>
      </Modal>
    </div>
  );
};


export default PostActions;