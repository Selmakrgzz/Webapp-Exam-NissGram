import React from "react";
import { Post } from "../../types/post";
import PostProfileHeader from "./PostProfileHeader";
import "../../styles/postCard.css";
import API_URL from '../../apiConfig';
import PostDates from "./PostDates";
import PostActions from "./PostActions";



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
  userLiked,
}) => {
  return (
    <div className="post-card">
      <PostProfileHeader
        profilePicture={user?.profilePicture || `${API_URL}/images/default-profile.png`}
        userName={user?.userName || "Unknown"}
        userProfileLink={`/user/${user?.userName || "unknown"}`}
      />
      {imgUrl && <img src={imgUrl} alt="Post image" className="post-image" />}
      <p>{text}</p>
      <PostDates dateCreated={dateCreated} dateUpdated={dateUpdated} />
      <div className="likes-comments-dates">
        <PostActions
          postId={user.id} // Pass på at dette er riktig ID
          userLiked={userLiked}
          likeCount={likeCount}
          commentCount={commentCount}
          onLike={onLike}
          onCommentClick={onCommentClick}
        />
      </div>
    </div>
  );
};

export default PostCard;

