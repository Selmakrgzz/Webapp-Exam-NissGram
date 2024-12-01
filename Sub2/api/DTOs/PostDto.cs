using System.ComponentModel.DataAnnotations;

namespace NissGram.DTOs
{
    public class PostDto
    {
        public int PostId { get; set; }
        public SimpleUserDto SimpleUser { get; set; } = new SimpleUserDto();
        public string? Text { get; set; }
        public string? ImgUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        public int LikeCount { get; set; } // Count of UserLikes
        public int CommentCount { get; set; } // Count of UserComments
        public List<CommentDto>? Comments { get; set; }
    }


    public class CreateUpdatePostDto
    {
        public int? PostId { get; set; }
        public string? Text { get; set; }
        public string? ImgUrl { get; set; }
    }

    public class CommentDto
    {
        public int? CommentId { get; set; } // Nullable for add operations
        public int PostId { get; set; }     // Required for all operations

        [StringLength(500, ErrorMessage = "Comment text cannot exceed 500 characters.")]
        public string? Text { get; set; }  // Required for add, optional for delete

        public string? Username { get; set; } // For response DTOs only
        public DateTime? DateCommented { get; set; } // For response DTOs only
    }
}
