using Microsoft.EntityFrameworkCore;
using NissGram.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NissGram.DAL.Repositories;
public class PostRepository : IPostRepository
{
    private readonly NissDbContext _context;

    public PostRepository(NissDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Post>> GetAllPostsAsync()
    {
        return await _context.Posts.Include(p => p.User).ToListAsync();
    }

    public async Task<Post?> GetPostByIdAsync(int id)
    {
        return await _context.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.PostId == id);
    }

    public async Task AddPostAsync(Post post)
    {
        await _context.Posts.AddAsync(post);
        await _context.SaveChangesAsync();
    }

    public async Task UpdatePostAsync(Post post)
    {
        _context.Posts.Update(post);
        await _context.SaveChangesAsync();
    }

    public async Task DeletePostAsync(int id)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post != null)
        {
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
        }
    }

    public async Task LikePostAsync(UserPostLike like)
    {
        await _context.UserPostLikes.AddAsync(like);
        await _context.SaveChangesAsync();
    }

    public async Task UnlikePostAsync(UserPostLike like)
    {
        _context.UserPostLikes.Remove(like);
        await _context.SaveChangesAsync();
    }

    public async Task AddCommentAsync(Comment comment)
    {
        await _context.Comments.AddAsync(comment);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteCommentAsync(int commentId)
    {
        var comment = await _context.Comments.FindAsync(commentId);
        if (comment != null)
        {
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
        }
    }
}

