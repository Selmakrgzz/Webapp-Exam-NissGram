using System.ComponentModel.DataAnnotations;


namespace NissGram.DTOs
{
    public class UserDto
    {
        public string? ProfilePicture { get; set; }
        public string? About { get; set; }
        public string? Username { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
    }

    public class UserUpdateDto
    {
        public string? ProfilePicture { get; set; }
        public string? About { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
    }
}


