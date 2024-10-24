namespace NissGram.Models;
public class Post
{
    public int PostId { get; set; }

    public virtual User User { get; set; } = default!;

    public string? Text { get; set; }
    public string? ImgUrl { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
    // Use a join entity for many-to-many
    public virtual ICollection<UserPostLike> UserLikes { get; set; } = new List<UserPostLike>();


}