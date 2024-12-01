using NissGram.Models;

namespace NissGram.DTOs
{
    public class UserProfileDto
    {
        public required string Username { get; set; }
        public int PictureCount { get; set; }
        public int NoteCount { get; set; }
        public string? About { get; set; } // Add this field
        public List<PostDto> Pictures { get; set; } = new List<PostDto>();
        public List<PostDto> Notes { get; set; } = new List<PostDto>();
        public List<PostDto> LikedPosts { get; set; } = new List<PostDto>();

    }
}