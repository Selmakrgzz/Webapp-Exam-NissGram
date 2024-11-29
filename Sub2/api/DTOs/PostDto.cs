using System;

namespace NissGram.DTOs
{
    public class PostDto
    {
        public int PostId { get; set; }
        public string Username { get; set; } = string.Empty; // Maps from User.UserName
        public string? Text { get; set; }
        public string? ImgUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        public int LikeCount { get; set; } // Count of UserLikes
        public int CommentCount { get; set; } // Count of UserComments
    }
}
