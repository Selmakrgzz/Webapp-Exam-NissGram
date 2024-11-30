import React from "react";
import API_URL from "../../apiConfig";
import PostProfileHeader from "./PostProfileHeader";
import '../../styles/postCard.css';
import PostDates from "./PostDates";
import PostActions from "./PostActions";
import { Post } from "../../types/post"; // Sørg for at typen Post er riktig definert.

const PostCard: React.FC<Post> = ({
  user,
  imgUrl,
  text,
  likeCount,
  commentCount,
  dateCreated,
  dateUpdated,
  onLike,
  onCommentClick,
  userLiked, // Passer for likes
}) => {
  return (
    <div className="post-card">
      {/* Profilheader */}
      <PostProfileHeader
        profilePicture={user?.profilePicture || `${API_URL}/images/default-profile.png`}
        userName={user?.userName || "Unknown"}
        userProfileLink={`/user/${user?.userName || "unknown"}`}
      />

      {/* Postens bilde */}
      {imgUrl && <img src={imgUrl} alt="Post image" className="post-image" />}

      {/* Postens tekst */}
      <p>{text}</p>

      {/* Datoer */}
      <PostDates dateCreated={dateCreated} dateUpdated={dateUpdated} />

      {/* Likes og kommentarer */}
      <div className="likes-comments-dates">
        <PostActions
          postId={user?.id || 0} // Sørg for at du bruker riktig ID her.
          userLiked={userLiked} // Overfør om brukeren har likt innlegget.
          likeCount={likeCount} // Overfør antall likes.
          commentCount={commentCount} // Overfør antall kommentarer.
          onLike={onLike} // Funksjon for håndtering av likes.
          onCommentClick={onCommentClick} // Funksjon for håndtering av kommentarer.
        />
      </div>
    </div>
  );
};

export default PostCard;
