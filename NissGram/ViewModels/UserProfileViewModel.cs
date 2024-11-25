using Microsoft.AspNetCore.Identity;
using NissGram.Models;

namespace NissGram.ViewModels

/*
    A specially designed file for the presentation layer to 
    encapsulate data that the _Profile.cshtml view requires. 
*/
{
    public class UserProfileViewModel
    {
        public User User { get; set; }  // The user data from User.cs
        public int PictureCount { get; set; }  // Count of pictures
        public int NoteCount { get; set; }  // Count of notes
        public List<Post> Pictures { get; set; } = new List<Post>(); // Pictures posted by the user
        public List<Post> Notes { get; set; } = new List<Post>(); // Notes written by the user
    }
}
