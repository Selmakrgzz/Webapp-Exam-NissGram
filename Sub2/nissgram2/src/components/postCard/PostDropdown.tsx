import React from "react";

interface PostDropdownProps {
  postId: number;
  isOwner: boolean;
  onUpdate: () => void;
  onDelete: () => void;
}

const PostDropdown: React.FC<PostDropdownProps> = ({
  postId,
  isOwner,
  onUpdate,
  onDelete,
}) => {
  if (!isOwner) return null;

  return (
    <div
      className="dropdown"
      style={{ position: "absolute", top: "10px", right: "10px" }}
    >
      <button
        className="btn btn-link p-0"
        type="button"
        id={`dropdownMenuButton-${postId}`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ color: "black" }}
      >
        {/* Burger Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby={`dropdownMenuButton-${postId}`}
      >
        <li>
          <button
            className="dropdown-item"
            onClick={onUpdate}
            style={{ cursor: "pointer" }}
          >
            Update
          </button>
        </li>
        <li>
          <form>
            <button
              type="button"
              className="dropdown-item text-danger"
              onClick={onDelete}
              style={{ cursor: "pointer" }}
            >
              Delete
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default PostDropdown;
