using Microsoft.EntityFrameworkCore;
using NissGram.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NissGram.DAL.Repositories;
public interface ICommentRepository
{
    Task<IEnumerable<Comment>> GetCommentsByPostIdAsync(int postId);
    Task<Comment?> GetCommentByIdAsync(int commentId);
    Task AddCommentAsync(Comment comment);
    Task DeleteCommentAsync(int commentId);
}
