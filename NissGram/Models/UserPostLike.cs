namespace NissGram.Models;

public class UserPostLike
{
    public int UserId { get; set; }
    public User User { get; set; } = default!;

    public int PostId { get; set; }
    public Post Post { get; set; } = default!;
}
