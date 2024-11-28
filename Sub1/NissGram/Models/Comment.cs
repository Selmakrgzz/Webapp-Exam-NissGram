using System.ComponentModel.DataAnnotations;


namespace NissGram.Models;
public class Comment
{

    public int CommentId { get; set; }

    public virtual Post Post { get; set; } = default!;
    public virtual User User { get; set; } = default!;

    public string UserId { get; set; } = default!; // Fremmednøkkel til User


    [Required(ErrorMessage = "Comment text is required.")]
    [StringLength(500, ErrorMessage = "Comment text cannot exceed 500 characters.")]
    public required string Text { get; set; }
    public DateTime dateCommented { get; set; } //capital letters?


}