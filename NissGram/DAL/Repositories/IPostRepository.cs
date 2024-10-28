using Microsoft.EntityFrameworkCore;
using NissGram.Models;

namespace NissGram.DAL.Repositories;
public interface IPostRepository
{
    Task<IEnumerable<Post>> GetAllPostsAsync();
    Task<Post?> GetPostByIdAsync(int id);
    //Task<UserPostLike?> GetLikeByUserAndPostAsync(int userId, int postId); 
    Task CreatePostAsync(Post post);
    Task UpdatePostAsync(Post post);
    Task DeletePostAsync(int id);
}


