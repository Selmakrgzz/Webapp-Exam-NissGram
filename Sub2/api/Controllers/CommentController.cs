using Microsoft.AspNetCore.Mvc;
using NissGram.DTOs;
using NissGram.Models;
using NissGram.DAL;

namespace NissGram.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentAPIController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly ILogger<CommentAPIController> _logger;

        public CommentAPIController(
            IPostRepository postRepository,
            IUserRepository userRepository,
            ICommentRepository commentRepository,
            ILogger<CommentAPIController> logger)
        {
            _postRepository = postRepository;
            _userRepository = userRepository;
            _commentRepository = commentRepository;
            _logger = logger;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] CommentDto commentDto)
        {
            if (string.IsNullOrWhiteSpace(commentDto.Text))
            {
                return BadRequest("Comment text is required.");
            }

            var user = await _userRepository.GetUserByUsernameAsync(User.Identity?.Name ?? string.Empty);
            if (user == null)
            {
                _logger.LogError("[CommentAPIController] User not found for logged-in user.");
                return Unauthorized("User not authenticated.");
            }

            var post = await _postRepository.GetPostByIdAsync(commentDto.PostId);
            if (post == null)
            {
                _logger.LogError("[CommentAPIController] Post not found for PostId: {PostId}", commentDto.PostId);
                return NotFound("Post not found.");
            }

            var comment = new Comment
            {
                Post = post,
                User = user,
                Text = commentDto.Text,
                DateCommented = DateTime.UtcNow
            };

            var success = await _commentRepository.AddCommentAsync(comment);
            if (!success)
            {
                _logger.LogError("[CommentAPIController] Failed to add comment for PostId: {PostId}", commentDto.PostId);
                return StatusCode(500, "An error occurred while adding the comment.");
            }

            return CreatedAtAction(nameof(Add), new { id = comment.CommentId }, new CommentDto
            {
                CommentId = comment.CommentId,
                PostId = commentDto.PostId,
                Text = comment.Text,
                Username = user.UserName,
                DateCommented = comment.DateCommented
            });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _commentRepository.DeleteCommentAsync(id);
            if (!success)
            {
                _logger.LogWarning("[CommentAPIController] Attempted to delete a non-existent comment. CommentId: {CommentId}", id);
                return NotFound("Comment not found.");
            }

            return NoContent();
        }

    }
}
