using NissGram.Models;

namespace NissGram.DAL;
public interface IPostRepository
{
    Task<IEnumerable<Post>?> GetAllPostsAsync();
    Task<IEnumerable<Post>?> GetAllPostsAsync(User user);
    Task<Post?> GetPostByIdAsync(int id);
    Task<int> CreatePostAsync(Post post);
    Task<bool> UpdatePostAsync(Post post);
    Task<bool> DeletePostAsync(int id);
    Task<int> GetCountLikes(Post post);

}


