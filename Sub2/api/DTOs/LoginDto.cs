using System.ComponentModel.DataAnnotations;


namespace NissGram.DTOs
{
    public class LoginDto
    {
        [Required]
        public required string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public required string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}