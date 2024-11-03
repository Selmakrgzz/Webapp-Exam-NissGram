using Microsoft.EntityFrameworkCore;
using NissGram.Models;

namespace NissGram.DAL.Repositories;
public interface IPostRepository
{
    Task<IEnumerable<Post>> GetAllPostsAsync();
    Task<Post?> GetPostByIdAsync(int id);
    //Task<UserPostLike?> GetLikeByUserAndPostAsync(int userId, int postId); 
    Task<bool> CreatePostAsync(Post post);
    Task<bool> UpdatePostAsync(Post post);
    Task<bool> DeletePostAsync(int id);
}


