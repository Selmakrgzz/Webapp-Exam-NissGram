using Microsoft.EntityFrameworkCore;
using NissGram.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NissGram.DAL.Repositories;
public interface IPostRepository
{
    Task<IEnumerable<Post>> GetAllPostsAsync();
    Task<Post?> GetPostByIdAsync(int id);
    Task AddPostAsync(Post post);
    Task UpdatePostAsync(Post post);
    Task DeletePostAsync(int id);
    Task LikePostAsync(UserPostLike like);
    Task UnlikePostAsync(UserPostLike like);
    Task AddCommentAsync(Comment comment);
    Task DeleteCommentAsync(int commentId);
}

