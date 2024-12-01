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

<<<<<<< Updated upstream
=======
  useEffect(() => {
    try {
      const savedLiked = localStorage.getItem(`post_${postId}_liked`);
      const savedLikeCount = localStorage.getItem(`post_${postId}_likeCount`);
  
      if (savedLiked !== null && savedLikeCount !== null) {
        setUserLiked(JSON.parse(savedLiked));
        setLikeCount(parseInt(savedLikeCount, 10));
      } else {
        // Fetch from backend
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
  

>>>>>>> Stashed changes
  const handleLike = async () => {
    try {
      // Oppdater state lokalt
      const newLikedState = !userLiked;
      const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;

      // Optimistically update the state
      setUserLiked(newLikedState);
      setLikeCount(newLikeCount);

      // Save the updated state to localStorage
      localStorage.setItem(`post_${postId}_liked`, JSON.stringify(newLikedState));
      localStorage.setItem(`post_${postId}_likeCount`, JSON.stringify(newLikeCount));

      // Make API call to update the backend
      const response = await fetch(`http://localhost:5024/api/PostAPI/like/${postId}`, {
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

      // Sync the state with backend response
      setUserLiked(data.userLiked);
      setLikeCount(data.likeCount);

      // Update localStorage with backend response
      localStorage.setItem(`post_${postId}_liked`, JSON.stringify(data.userLiked));
      localStorage.setItem(`post_${postId}_likeCount`, JSON.stringify(data.likeCount));
    } catch (error) {
      console.error("Error updating like status:", error);

      // Revert optimistic update on error
      setUserLiked(!userLiked);
      setLikeCount((prev) => (userLiked ? prev - 1 : prev + 1));

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
