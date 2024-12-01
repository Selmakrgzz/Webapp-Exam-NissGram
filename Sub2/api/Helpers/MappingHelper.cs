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
                Username = user.UserName ?? "unknown",
                PictureCount = user.Posts?.Count(p => !string.IsNullOrEmpty(p.ImgUrl)) ?? 0,
                NoteCount = user.Posts?.Count(p => string.IsNullOrEmpty(p.ImgUrl)) ?? 0,
                About = user.About ?? "No desc available.", // Ensure About is mapped
                Pictures = MapPostsToDtos(user.Posts?.Where(p => !string.IsNullOrEmpty(p.ImgUrl))),
                Notes = MapPostsToDtos(user.Posts?.Where(p => string.IsNullOrEmpty(p.ImgUrl))),
                LikedPosts = MapPostsToDtos(user.LikedPosts?.Select(like => like.Post))
            };
        }

        public static UserDto MapToUserDto(User user)
        {
            return new UserDto
            {
                ProfilePicture = user.ProfilePicture,
                About = user.About,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            };
        }


        // Map UserUpdateDto to User
        public static void MapUserUpdateDtoToUser(User user, UserUpdateDto dto)
        {
            user.About = dto.About;
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.PhoneNumber = dto.PhoneNumber;

            // ProfilePicture is optional, so we update it only if provided
            if (!string.IsNullOrEmpty(dto.ProfilePicture))
            {
                user.ProfilePicture = dto.ProfilePicture;
            }
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
