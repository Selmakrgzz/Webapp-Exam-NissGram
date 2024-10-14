using Microsoft.AspNetCore.Mvc;
using NissGram.Models;
using Microsoft.EntityFrameworkCore;



namespace NissGram.Controllers
{
    public class PostController : Controller
    {

        // GET: /Posts use on the main page.
        public async Task<IActionResult> Index()
        {
            // Fetch all posts, including related user data
            var posts = await _context.Posts.Include(p => p.User).ToListAsync();
            return View(posts);
        }


        // GET: /Posts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var post = await _context.Posts
                .Include(p => p.User)
                .FirstOrDefaultAsync(m => m.PostId == id);
            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }

        // LIKE A POST
        [HttpPost]
        public async Task<IActionResult> LikePost(int postId)
        {
            var post = await _context.Posts.Include(p => p.UserLikes).FirstOrDefaultAsync(p => p.PostId == postId);
            if (post == null)
            {
                return NotFound();
            }

            var userId = 1;  // Replace with the currently logged-in user ID
            var existingLike = post.UserLikes.FirstOrDefault(ul => ul.UserId == userId);

            if (existingLike == null)  // Add like
            {
                var like = new UserPostLike { PostId = postId, UserId = userId };
                _context.UserPostLikes.Add(like);
            }
            else  // Remove like (unlike)
            {
                _context.UserPostLikes.Remove(existingLike);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Details), new { id = postId });
        }
    }
}