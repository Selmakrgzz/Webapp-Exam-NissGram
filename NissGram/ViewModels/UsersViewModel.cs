using Microsoft.AspNetCore.Identity;
using NissGram.Models;

namespace NissGram.ViewModels
{
    public class UsersViewModel
    {
        public IEnumerable<User> Users;
        public string? CurrentViewName;

        public UsersViewModel(IEnumerable<User> users, string? currentViewName)
        {
            Users = users;
            CurrentViewName = currentViewName;
        }
    }
}