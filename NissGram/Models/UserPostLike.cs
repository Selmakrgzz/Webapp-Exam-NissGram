namespace NissGram.Models;

public class UserPostLike
{
    public int UserId { get; set; }
    public virtual User User { get; set; } = default!;

    public int PostId { get; set; }
    public virtual Post Post { get; set; } = default!;
}
