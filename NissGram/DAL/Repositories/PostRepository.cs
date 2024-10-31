using Microsoft.EntityFrameworkCore;
using NissGram.Models;

namespace NissGram.DAL.Repositories;
public class PostRepository : IPostRepository
{
    private readonly NissDbContext _context;

    public PostRepository(NissDbContext context)
    {
        _context = context;
    }

    // GET ALL POSTS
    public async Task<IEnumerable<Post>> GetAllPostsAsync()
    {
        return await _context.Posts.Include(p => p.User).ToListAsync();
    }

    // GET SINGLE POST 
    public async Task<Post?> GetPostByIdAsync(int id)
    {
        return await _context.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.PostId == id);
    }

    // CREATE
    public async Task CreatePostAsync(Post post)
    {
        await _context.Posts.AddAsync(post);
        await _context.SaveChangesAsync();
    }

    // UPDATE
    public async Task UpdatePostAsync(Post post)
    {
        _context.Posts.Update(post);
        await _context.SaveChangesAsync();
    }

    // DELETE
    public async Task DeletePostAsync(int id)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post != null)
        {
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
        }
    }

}

