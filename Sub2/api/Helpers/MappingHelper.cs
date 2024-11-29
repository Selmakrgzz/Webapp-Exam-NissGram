using NissGram.Models;
using NissGram.DTOs;

namespace NissGram.Helpers
{
    public static class MappingHelper
    {
        public static UserProfileDto MapToUserProfileDto(User user)
        {
            return new UserProfileDto
            {
                Username = user.UserName,
                PictureCount = user.Posts?.Count(p => !string.IsNullOrEmpty(p.ImgUrl)) ?? 0,
                NoteCount = user.Posts?.Count(p => string.IsNullOrEmpty(p.ImgUrl)) ?? 0,
                Pictures = MapPostsToDtos(user.Posts?.Where(p => !string.IsNullOrEmpty(p.ImgUrl))),
                Notes = MapPostsToDtos(user.Posts?.Where(p => string.IsNullOrEmpty(p.ImgUrl))),
                LikedPosts = MapPostsToDtos(user.LikedPosts?.Select(like => like.Post))
            };
        }

        public static List<PostDto> MapPostsToDtos(IEnumerable<Post>? posts)
        {
            return posts?.Select(p => new PostDto
            {
                PostId = p.PostId,
                Username = p.User?.UserName ?? "unknown",
                Text = p.Text,
                ImgUrl = p.ImgUrl,
                DateCreated = p.DateCreated,
                DateUpdated = p.DateUpdated,
                LikeCount = p.UserLikes?.Count ?? 0,
                CommentCount = p.UserComments?.Count ?? 0
            }).ToList() ?? [];
        }

        public static PostDto MapToPostDto(Post post)
        {
            return new PostDto
            {
                PostId = post.PostId,
                Username = post.User?.UserName ?? "Unknown",
                Text = post.Text,
                ImgUrl = post.ImgUrl,
                DateCreated = post.DateCreated,
                DateUpdated = post.DateUpdated,
                LikeCount = post.UserLikes?.Count ?? 0,
                CommentCount = post.UserComments?.Count ?? 0,
                Comments = post.UserComments?
                    .Select(comment => new CommentDto
                    {
                        CommentId = comment.CommentId,
                        Text = comment.Text,
                        Username = comment.User?.UserName ?? "Unknown",
                        DateCommented = comment.DateCommented
                    })
                    .ToList() ?? new List<CommentDto>()
            };
        }
    }
}
