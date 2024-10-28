using Microsoft.AspNetCore.Mvc;
using NissGram.DAL;
using NissGram.Repositories;
using NissGram.Models;
using System.Threading.Tasks;

namespace NissGram.Controllers;
public class PostController : Controller
{
    private readonly IPostRepository _postRepository;

    public PostController(IPostRepository postRepository)
    {
        _postRepository = postRepository;
    }

    // GET: /Posts - Hent alle innlegg for hovedsiden
    public async Task<IActionResult> Index()
    {
        var posts = await _postRepository.GetAllPostsAsync();
        return View(posts);
    }

    // GET: Vis detaljer for et enkelt innlegg, inkludert kommentarer og antall likes
    public async Task<IActionResult> Details(int id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var user = await _userRepository.GetUserByIdAsync(id);
        if (user == null)
            return NotFound();
        return View(user);
    }

    // Like a Post
    [HttpPost]
    public async Task<IActionResult> LikePost(int postId)
    {
        var userId = 1; // Replace with the currently logged-in user ID
        
        // Check if the post exists
        var post = await _postRepository.GetPostByIdAsync(postId);
        if (post == null)
        {
            return NotFound();
        }

        // Check if the user has already liked the post
        var existingLike = await _postRepository.GetLikeByUserAndPostAsync(userId, postId);

        if (existingLike == null) // Add like
        {
            var like = new UserPostLike { PostId = postId, UserId = userId };
            await _postRepository.LikePostAsync(like);
        }
        else // Remove like (unlike)
        {
            await _postRepository.UnlikePostAsync(existingLike);
        }

        return RedirectToAction(nameof(Details), new { id = postId });
    }

    
}

