namespace NissGram.Models;


public class Comment
{

    public int CommentId { get; set; }

    public virtual Post Post { get; set; } = default!;
    public virtual User User { get; set; } = default!;
    public required string Text { get; set; }
    public DateTime dateCommented { get; set; }


}