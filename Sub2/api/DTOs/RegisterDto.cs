using System.ComponentModel.DataAnnotations;

namespace NissGram.DTOs
{
    public class RegisterDto
    {
        [Required]
        [RegularExpression(@"[a-zA-ZæøåÆØÅ0-9._-]{3,20}", ErrorMessage = "The Username must be 3 to 20 characters and can include letters, numbers, dots, underscores, and hyphens.")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; } = string.Empty;

        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}", ErrorMessage = "The Name must be letters and between 2 to 20 characters.")]
        [Display(Name = "First name")]
        public string? FirstName { get; set; }

        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}", ErrorMessage = "The Name must be letters and between 2 to 20 characters.")]
        [Display(Name = "Last name")]
        public string? LastName { get; set; }

        [StringLength(500, ErrorMessage = "About section cannot exceed 500 characters.")]
        public string? About { get; set; }

        [Display(Name = "Profile Picture URL")]
        public string? ProfilePicture { get; set; }
    }
}
