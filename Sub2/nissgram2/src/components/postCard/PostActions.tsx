import React, { useState, useEffect } from "react";
import API_URL from "../../apiConfig";
import { Modal } from 'react-bootstrap';
import PostPopup from "./PostPopup";
import PostProfileHeader from "./PostProfileHeader";
import '../../styles/popUp.css';

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
    try {
      const savedLiked = localStorage.getItem(`post_${postId}_liked`);
      const savedLikeCount = localStorage.getItem(`post_${postId}_likeCount`);

      if (savedLiked !== null && savedLikeCount !== null) {
        setUserLiked(JSON.parse(savedLiked));
        setLikeCount(parseInt(savedLikeCount, 10));
      } else {
        const fetchLikeStatus = async () => {
          try {
            const response = await fetch(`${API_URL}/api/PostAPI/details/${postId}`, {
              method: "GET",
              credentials: "include",
            });

            if (!response.ok) {
              throw new Error(`Failed to fetch like status. Status: ${response.status}`);
            }

            const data = await response.json();
            setUserLiked(data.userLiked);
            setLikeCount(data.likeCount);

            localStorage.setItem(`post_${postId}_liked`, JSON.stringify(data.userLiked));
            localStorage.setItem(`post_${postId}_likeCount`, JSON.stringify(data.likeCount));
          } catch (error) {
            console.error("Error fetching like status:", error);
            setError("Failed to load like status.");
          }
        };

        fetchLikeStatus();
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setError("Failed to access local storage.");
    }
  }, [postId]);

  const handleLike = async () => {
    try {
      const newLikedState = !userLiked;
      const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;

      setUserLiked(newLikedState);
      setLikeCount(newLikeCount);

      localStorage.setItem(`post_${postId}_liked`, JSON.stringify(newLikedState));
      localStorage.setItem(`post_${postId}_likeCount`, JSON.stringify(newLikeCount));

      const response = await fetch(`${API_URL}/api/PostAPI/like/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: newLikedState }),
      });

      if (!response.ok) {
        throw new Error("Failed to update like status.");
      }

      const data = await response.json();
      setUserLiked(data.userLiked);
      setLikeCount(data.likeCount);

      localStorage.setItem(`post_${postId}_liked`, JSON.stringify(data.userLiked));
      localStorage.setItem(`post_${postId}_likeCount`, JSON.stringify(data.likeCount));
    } catch (error) {
      console.error("Error updating like status:", error);
      setUserLiked(!userLiked);
      setLikeCount((prev) => (userLiked ? prev - 1 : prev + 1));
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
            user={user}
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
            onClose={toggleModal}
            onCommentClick={onCommentClick}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostActions;
