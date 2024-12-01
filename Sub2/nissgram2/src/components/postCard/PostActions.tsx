import React, { useState } from "react";
import API_URL from "../../apiConfig";

interface PostActionsProps {
  postId: number;
  userLiked: boolean;
  likeCount: number;
  commentCount: number;
  onCommentClick: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  userLiked: initialUserLiked,
  likeCount: initialLikeCount,
  commentCount,
  onCommentClick,
}) => {
  const [userLiked, setUserLiked] = useState(initialUserLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [error, setError] = useState<string | null>(null);

  const handleLike = async () => {
    try {
      // Oppdater state lokalt
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
      {/* Feilmelding */}
      {error && <div className="text-danger">{error}</div>}

      {/* Like-knappen */}
      <div className="d-flex align-items-center mr-3 like-button-container">
        <button
          onClick={(e) => {
            e.preventDefault(); // Forhindre standard form-oppførsel
            handleLike(); // Håndter likes
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

      {/* Kommentarseksjonen */}
      <div
        className="d-flex align-items-center mr-3 comment-button-container"
        style={{ cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target={`#postModal-${postId}`} // Koble modal til riktig post
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
