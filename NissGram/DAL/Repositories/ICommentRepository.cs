using NissGram.Models;

namespace NissGram.DAL;
public interface ICommentRepository
{
    Task<IEnumerable<Comment>?> GetAllComments(Post post);

    //Task<UserPostLike?> GetLikeByUserAndPostAsync(int userId, int postId); 
    Task<bool> CreateComment(Comment comment);
    Task<bool> UpdateComment(Comment comment);
    Task<bool> DeleteComment(int id);
}

