using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NissGram.DAL;
using NissGram.Models;
using NissGram.ViewModels;
using System.Security.Claims;


namespace NissGram.Controllers;
public class CommentController : Controller
{
    private readonly IPostRepository _postRepository;
    private readonly IUserRepository _userRepository;
    private readonly ICommentRepository _commentRepository;
    private readonly ILogger<PostController> _logger;

    public CommentController(IPostRepository postRepository, IUserRepository userRepository, ICommentRepository commentRepository, ILogger<PostController> logger)
    {
        _userRepository = userRepository;
        _postRepository = postRepository;
        _commentRepository = commentRepository;
        _logger = logger;
    }

 [HttpPost]
    public async Task<IActionResult> Add(int postId, string text)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            ModelState.AddModelError("", "Comment text cannot be empty.");
            return BadRequest("Comment text cannot be empty.");
        }

        // Fetch the user
        var user = await _userRepository.GetUserByUsernameAsync(User.Identity?.Name ?? string.Empty);
        if (user == null)
        {
            return Unauthorized();
        }

        // Fetch the post
        var post = await _postRepository.GetPostByIdAsync(postId);
        if (post == null)
        {
            return NotFound("Post not found.");
        }

        // Create the comment
        var comment = new Comment
        {
            Post = post,
            User = user,
            Text = text,
            dateCommented = DateTime.Now
        };

        // Save the comment
        var success = await _commentRepository.AddCommentAsync(comment);
        if (!success)
        {
            _logger.LogError("Failed to add comment for PostId: {PostId}", postId);
            return StatusCode(500, "An error occurred while adding the comment.");
        }

        _logger.LogInformation("Comment added successfully for PostId: {PostId}", postId);

        /// Redirect back to the specific post section
        return RedirectToAction(nameof(Index), "Home", new { section = $"post-{postId}" });
    }

    // Delete a comment
    [HttpPost]
    public async Task<IActionResult> Delete(int commentId, int postId)
    {
        var comment = await _commentRepository.DeleteCommentAsync(commentId);
        if (!comment)
        {
            _logger.LogWarning("Attempted to delete a comment that does not exist. CommentId: {CommentId}", commentId);
            return NotFound("Comment not found.");
        }

        _logger.LogInformation("Comment deleted successfully. CommentId: {CommentId}", commentId);
        /// Redirect back to the specific post section
        return RedirectToAction(nameof(Index), "Home", new { section = $"post-{postId}" });
        
    }
}

