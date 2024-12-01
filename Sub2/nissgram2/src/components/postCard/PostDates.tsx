import React from "react";

interface PostDatesProps {
  dateCreated: Date | string; // Accept both Date object and string
  dateUpdated: Date | string; // Accept both Date object and string
}

const PostDates: React.FC<PostDatesProps> = ({ dateCreated, dateUpdated }) => {
  const formatDate = (date: Date | string): string => {
    const validDate = typeof date === "string" ? new Date(date) : date;
    return validDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <p className="text-muted">
      <small>Posted on {formatDate(dateCreated)}</small>
      <br />
      <small>Last updated on {formatDate(dateUpdated)}</small>
    </p>
  );
};

export default PostDates;
