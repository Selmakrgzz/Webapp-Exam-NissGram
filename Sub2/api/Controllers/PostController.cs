using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NissGram.DAL;
using NissGram.Helpers;
using NissGram.DTOs;
using NissGram.Models;
using System.Security.Claims;


namespace NissGram.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostAPIController : Controller
{
    private readonly IPostRepository _postRepository;
    private readonly IUserRepository _userRepository;
    private readonly ILogger<PostAPIController> _logger;

    public PostAPIController(IPostRepository postRepository, IUserRepository userRepository, ILogger<PostAPIController> logger)
    {
        _userRepository = userRepository;
        _postRepository = postRepository;
        _logger = logger;
    }

    // GET: api/posts/Details/{id}
    [HttpGet("details/{id}")]
    public async Task<IActionResult> Details(int id)
    {
        var post = await _postRepository.GetPostByIdAsync(id);

        if (post == null)
        {
            _logger.LogError("[PostAPIController] Getting post failed for postid: {id}", id);
            return NotFound(new { Message = "Post not found" });
        }
        var postDto = MappingHelper.MapToPostDto(post);
        return Ok(postDto); // Return the mapped DTO
    }


    [HttpPost("create")]
    public async Task<IActionResult> Create([FromForm] CreateUpdatePostDto postDto, IFormFile? uploadImage)
    {
        if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
        {
            return Unauthorized(new { error = "User is not authenticated." });
        }

        // Get the current user
        var user = await _userRepository.GetUserByUsernameAsync(User.Identity.Name);
        if (user == null)
        {
            _logger.LogWarning("[PostController] User not found for username: {UserName}", User.Identity.Name);
            return NotFound(new { error = "User not found." });
        }

        // Validate input
        if (string.IsNullOrWhiteSpace(postDto.Text) && (uploadImage == null || uploadImage.Length == 0))
        {
            return BadRequest(new { error = "You must provide either text or an image." });
        }

        string? imageUrl = null;

        // Handle image upload if provided
        if (uploadImage != null && uploadImage.Length > 0)
        {
            try
            {
                var fileName = Guid.NewGuid() + Path.GetExtension(uploadImage.FileName);
                var filePath = Path.Combine("wwwroot/images/post_images", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(stream);
                }

                imageUrl = "/images/post_images/" + fileName;
            }
            catch (Exception ex)
            {
                _logger.LogError("[PostController] Error occurred while uploading image. Exception: {Message}", ex.Message);
                return StatusCode(500, new { error = "An error occurred while uploading the image." });
            }
        }

        // Create a new Post instance
        var post = new Post
        {
            User = user,
            Text = postDto.Text,
            ImgUrl = imageUrl,
            DateCreated = DateTime.UtcNow,
            DateUpdated = DateTime.UtcNow
        };

        try
        {
            int postId = await _postRepository.CreatePostAsync(post);
            if (postId == -1)
            {
                _logger.LogError("[PostController] Failed to create a new post. Post data: {@Post}", post);
                return StatusCode(500, new { error = "An unexpected error occurred while trying to create the post." });
            }

            var createdPostDto = MappingHelper.MapToPostDto(post);
            return CreatedAtAction(nameof(Details), new { id = postId }, createdPostDto);

        }
        catch (Exception ex)
        {
            _logger.LogError("[PostController] An error occurred while creating a post. Exception: {Message}", ex.Message);
            return StatusCode(500, new { error = "A system error occurred while processing your request. Please contact support." });
        }

    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _postRepository.DeletePostAsync(id);
        if (!success)
        {
            _logger.LogWarning("[PostAPIController] Failed to delete post for postId: {postId}", id);
            return NotFound("Comment not found");
        }

        return NoContent();
    }


    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(int id, [FromForm] CreateUpdatePostDto model, IFormFile? newImage)
    {
        // Fetch the existing post using the id from the route
        var existingPost = await _postRepository.GetPostByIdAsync(id);
        if (existingPost == null)
        {
            _logger.LogError("[PostAPIController] Post not found for id: {id}", id);
            return NotFound(new { error = "Post not found." });
        }

        // Ensure the authenticated user owns the post
        if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
        {
            return Unauthorized(new { error = "User is not authenticated." });
        }

        var currentUser = await _userRepository.GetUserByUsernameAsync(User.Identity.Name);
        if (currentUser == null || existingPost.User.Id != currentUser.Id)
        {
            return Forbid();
        }

        // Check if both Text and newImage are empty/null
        if (string.IsNullOrWhiteSpace(model.Text) && newImage == null && string.IsNullOrWhiteSpace(existingPost.ImgUrl))
        {
            return BadRequest(new { error = "Both text and image cannot be empty." });
        }


        // Update text (set to empty if null or whitespace)
        if (string.IsNullOrWhiteSpace(model.Text))
        {
            existingPost.Text = string.Empty;
        }
        else if (model.Text != existingPost.Text)
        {
            existingPost.Text = model.Text;
        }

        if (model.ImgUrl == null)
        {
            existingPost.ImgUrl = string.Empty;
        }

        // Handle new image upload or reset ImgUrl if newImage is null
        if (newImage != null && newImage.Length > 0)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(newImage.FileName);
            var filePath = Path.Combine("wwwroot/images/post_images", fileName);

            try
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await newImage.CopyToAsync(stream);
                }

                existingPost.ImgUrl = "/images/post_images" + fileName;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while uploading image.");
                return StatusCode(500, new { error = "An error occurred while uploading the image." });
            }
        }



        // Update timestamp
        existingPost.DateUpdated = DateTime.UtcNow;

        // Save changes
        try
        {
            var success = await _postRepository.UpdatePostAsync(existingPost);
            if (!success)
            {
                return StatusCode(500, new { error = "Failed to update the post." });
            }

            // Map updated post to PostDto for response
            var updatedPostDto = MappingHelper.MapToPostDto(existingPost);

            return Ok(updatedPostDto); // Use Ok instead of CreatedAtAction for updates
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while updating the post.");
            return StatusCode(500, new { error = "A system error occurred while updating the post." });
        }
    }


    [HttpPost("like/{postId}")]
    public async Task<IActionResult> Like(int postId)
    {
        // Authenticate the user
        var user = await _userRepository.GetUserByUsernameAsync(User.Identity?.Name ?? string.Empty);
        if (user == null)
        {
            return Unauthorized(new { error = "User is not authenticated." });
        }

        // Retrieve the post
        var post = await _postRepository.GetPostByIdAsync(postId);
        if (post == null)
        {
            _logger.LogError("[PostController] Post not found with PostId: {PostId}", postId);
            return NotFound(new { error = "Post not found." });
        }

        // Check if the user has already liked the post
        var existingLike = post.UserLikes.FirstOrDefault(like => like.UserId == user.Id);

        if (existingLike != null)
        {
            // If the user has already liked, remove the like
            post.UserLikes.Remove(existingLike);
        }
        else
        {
            // If the user hasn't liked, add the like
            post.UserLikes.Add(new UserPostLike
            {
                UserId = user.Id,
                PostId = postId,
            });
        }

        // Save the changes
        var success = await _postRepository.UpdatePostAsync(post);

        if (!success)
        {
            _logger.LogError("[PostController] Error updating like on PostId: {PostId}", postId);
            return StatusCode(500, new { error = "An error occurred while updating the like status." });
        }

        // Return the updated like count and action performed
        return Ok(new
        {
            message = existingLike != null ? "Like removed" : "Like added",
            likeCount = post.UserLikes.Count
        });
    }

}