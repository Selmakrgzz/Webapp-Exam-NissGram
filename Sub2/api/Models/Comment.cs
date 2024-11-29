using System.ComponentModel.DataAnnotations;


namespace NissGram.Models;
public class Comment
{

    public int CommentId { get; set; }

    public virtual Post Post { get; set; } = default!;
    public virtual User User { get; set; } = default!;

    [Required(ErrorMessage = "Comment text is required.")]
    [StringLength(500, ErrorMessage = "Comment text cannot exceed 500 characters.")]
    public required string Text { get; set; }
    public DateTime DateCommented { get; set; }


}