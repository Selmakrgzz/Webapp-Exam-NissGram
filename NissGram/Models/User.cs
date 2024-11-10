using Microsoft.AspNetCore.Identity;

namespace NissGram.Models;

public class User : IdentityUser
{
    // public int UserId { get; set; }

    // public required string UserName { get; set; }
    // public required string Email { get; set; }
    // public required string Password { get; set; }
    // public string FirstName { get; set; } = string.Empty;
    // public string LastName { get; set; } = string.Empty;

    public string? ProfilePicture { get; set; }
    public string? PhoneNr { get; set; }

    // Posts created by the user
    public virtual ICollection<Post>? Posts { get; set; }

    // Likes made by the user
    public virtual ICollection<UserPostLike> LikedPosts { get; set; } = new List<UserPostLike>();

}

