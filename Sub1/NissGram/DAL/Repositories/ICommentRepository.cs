using NissGram.Models;

namespace NissGram.DAL.Repositories
{
    public interface ICommentRepository
    {

        Task<bool> AddCommentAsync(Comment comment);
        Task<bool> DeleteCommentAsync(int commentId);


    }
}
