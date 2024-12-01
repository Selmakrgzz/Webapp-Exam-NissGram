import React, { useEffect, useState } from "react";
import API_URL from "../../apiConfig";

interface PostActionsProps {
  postId: number;
  userLiked: boolean;
  likeCount: number;
  commentCount: number;
  onLike: () => void; // Legg til dette hvis det mangler
  onCommentClick: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  userLiked: initialUserLiked,
  likeCount: initialLikeCount,
  commentCount,
  onCommentClick,
}) => {
  // State for likes og om brukeren har likt
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

      const response = await fetch(`http://localhost:5024/api/PostAPI/like/${postId}`, {
        method: "POST",
        credentials: "include",
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
      setUserLiked(!userLiked); // Tilbakestill tilstand ved feil
      setLikeCount((prev) => (userLiked ? prev + 1 : prev - 1));
      setError("An error occurred while updating your like.");
    }
    setUserLiked(!userLiked); // Oppdater state for userLiked
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

      <div
        className="d-flex align-items-center mr-3 comment-button-container"
        style={{ cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target={`#postModal-${postId}`}
        onClick={onCommentClick}
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
