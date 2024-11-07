using NissGram.Models;

namespace NissGram.ViewModels
{
    public class PostsViewModel
    {
        public IEnumerable<Post> Posts;
        public string? CurrentViewName;

        public PostsViewModel(IEnumerable<Post> posts, string? currentViewName)
        {
            Posts = posts;
            CurrentViewName = currentViewName;
        }
    }
}