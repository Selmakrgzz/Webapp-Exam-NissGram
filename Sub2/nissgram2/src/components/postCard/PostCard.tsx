import React from "react";
import API_URL from "../../apiConfig";
import PostProfileHeader from "./PostProfileHeader";
import "../../styles/postCard.css";
import PostDates from "./PostDates";
import PostActions from "./PostActions";
import { Post } from "../../types/post";
import PostDropdown from "./PostDropdown";

interface PostCardProps extends Post {
  postId: number;
  currentUserName: string;
}

const PostCard: React.FC<PostCardProps> = ({
  user,
  imgUrl,
  text,
  likeCount,
  commentCount,
  dateCreated,
  dateUpdated,
  userLiked,
  postId,
  currentUserName,
}) => {
  const handleEdit = () => {
    console.log(`Editing post with ID: ${postId}`);
  };

  const handleDelete = () => {
    console.log(`Deleting post with ID: ${postId}`);
  };

  const handleCommentClick = () => {
    console.log("Comment clicked for post:", postId);
  };

  return (
    <div className="post-card" style={{ position: "relative", marginBottom: "20px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <PostProfileHeader
          profilePicture={user?.profilePicture || "/default-profile.png"}
          userName={user?.userName || "Unknown"}
          userProfileLink={`/user/${user?.userName || "unknown"}`}
        />

        {/* Dropdown Button - vises kun for innlogget bruker */}
        {currentUserName === user.userName && (
          <PostDropdown onEdit={handleEdit} onDelete={handleDelete} postId={postId} />
        )}
      </div>

      {imgUrl && (
        <img
          src={imgUrl.startsWith("/images/postImages") ? `${API_URL}${imgUrl}` : `http://localhost:5024${imgUrl}`}
          alt="Post"
          className="img-fluid rounded"
          style={{ marginTop: "10px" }}
        />
      )}

      <p>{text}</p>
      <hr/>

      {/* PostDates */}
      <PostDates dateCreated={new Date(dateCreated)} dateUpdated={new Date(dateUpdated)} />

      {/* PostActions */}
      <PostActions
        postId={postId}
        user={user}
        imgUrl={imgUrl?  imgUrl : ''  }
        text={text}
        dateCreated={new Date(dateCreated)}
        dateUpdated={new Date(dateUpdated)}
        comments={[]} // Anta at denne fylles korrekt opp et annet sted i appen
        userLiked={userLiked}
        likeCount={likeCount}
        commentCount={commentCount}
        onLike={handleCommentClick}
        onAddComment={() => {}}
        onDeleteComment={() => {}}
        onCommentClick={handleCommentClick}
      />
    </div>
  );
};

export default PostCard;
