using Microsoft.EntityFrameworkCore;
using NissGram.Models;

namespace NissGram.DAL.Repositories;
public class PostRepository : IPostRepository
{
    private readonly NissDbContext _db;

    public PostRepository(NissDbContext db)
    {
        _db = db;
    }

    // GET ALL POSTS
    public async Task<IEnumerable<Post>> GetAllPostsAsync()
    {
        return await _db.Posts.Include(p => p.User).ToListAsync();
    }

    // GET SINGLE POST 
    public async Task<Post?> GetPostByIdAsync(int id)
    {
        return await _db.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.PostId == id);
    }

    // CREATE
    public async Task<bool> CreatePostAsync(Post post)
    {
        try{
            _db.Posts.Add(post);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    // UPDATE
    public async Task<bool> UpdatePostAsync(Post post)
    {   
        try{
            _db.Posts.Update(post);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    // DELETE
    public async Task<bool> DeletePostAsync(int id)
    {
        try{
            var post = await _db.Posts.FindAsync(id);
            if (post != null)
            {
                _db.Posts.Remove(post);
                await _db.SaveChangesAsync();
            }
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

}

