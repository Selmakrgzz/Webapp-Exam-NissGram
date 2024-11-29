using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NissGram.DAL;
using NissGram.Helpers;
using NissGram.DTOs;
using NissGram.Models;
using NissGram.ViewModels;
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
    public async Task<IActionResult> Create([FromForm] CreatePostDto postDto, IFormFile? uploadImage)
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
                var filePath = Path.Combine("wwwroot/images", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(stream);
                }

                imageUrl = "/images/" + fileName;
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

        var createdPostDto = MappingHelper.MapToPostDto(post);
        try
        {
            bool success = await _postRepository.CreatePostAsync(post);
            if (!success)
            {
                _logger.LogError("[PostController] Failed to create a new post. Post data: {@Post}", post);
                return StatusCode(500, new { error = "An unexpected error occurred while trying to create the post." });
            }

            _logger.LogInformation("[PostController] Post created successfully. PostId: {PostId}", post.PostId);
            return CreatedAtAction(nameof(Details), new { id = createdPostDto.PostId }, createdPostDto);

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
}

// public class PostController : Controller
// {
//     // GET: Create Post Form
//     [HttpGet]
//     public IActionResult Create()
//     {
//         return View();
//     }



//     // GET: Show the update form
//     [HttpGet]
//     public async Task<IActionResult> Update(int id)
//     {
//         var post = await _postRepository.GetPostByIdAsync(id);
//         if (post == null)
//         {
//             _logger.LogError("[PostController] An error occurred while getting post with PostId: {PostId}", id);
//             return NotFound();
//         }
//        // Map post to ViewModel
//         var model = new PostUpdateViewModel
//         {
//             PostId = post.PostId,
//             Text = post.Text,
//             ExistingImgUrl = post.ImgUrl // Use ImgUrl property for existing image
//         };
//         return View("PostUpdateView", model); // Display the update form with existing data
//     }

//    [HttpPost]
//     public async Task<IActionResult> Update(PostUpdateViewModel model)
//     {
//         if (!ModelState.IsValid)
//         {
//             return View("PostUpdateView", model); // Returner skjemaet hvis validering feiler
//         }

//         // Hent eksisterende post
//         var existingPost = await _postRepository.GetPostByIdAsync(model.PostId);
//         if (existingPost == null)
//         {
//             return NotFound();
//         }

//         // Oppdater tekst
//         if (!string.IsNullOrWhiteSpace(model.Text) && model.Text != existingPost.Text)
//         {
//             existingPost.Text = model.Text;
//         }

//         // Håndter ny bildeopplasting
//         if (model.NewImage != null && model.NewImage.Length > 0)
//         {
//             var fileName = Guid.NewGuid() + Path.GetExtension(model.NewImage.FileName);
//             var filePath = Path.Combine("wwwroot/images", fileName);

//             try
//             {
//                 using (var stream = new FileStream(filePath, FileMode.Create))
//                 {
//                     await model.NewImage.CopyToAsync(stream);
//                 }

//                 existingPost.ImgUrl = "/images/" + fileName;
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "Error occurred while uploading image.");
//                 ModelState.AddModelError("", "An error occurred while uploading the image.");
//                 return View("PostUpdateView", model);
//             }
//         }

//         // Oppdater tidsstempel
//         existingPost.DateUpdated = DateTime.Now;

//         // Lagre oppdateringen
//         var success = await _postRepository.UpdatePostAsync(existingPost);
//         if (success)
//         {
//             return RedirectToAction("Index", "Home"); // Redirect til hjemmesiden

//         }

//         ModelState.AddModelError("", "Failed to update the post.");
//         return RedirectToAction(nameof(PostUpdateViewModel));
//     }








//     [HttpPost]
//     public async Task<IActionResult> Like(int postId)
//     {
//         var user = await _userRepository.GetUserByUsernameAsync(User.Identity?.Name ?? string.Empty);
//         if (user == null) return Unauthorized();

//         var post = await _postRepository.GetPostByIdAsync(postId);
//         if (post == null)
//         {
//             _logger.LogError("[PostController] An error occurred while getting post with PostId: {PostId}", postId);
//             return NotFound();
//         }

//         // Check if the user has already liked the post
//         var existingLike = post.UserLikes.FirstOrDefault(like => like.UserId == user.Id);

//         if (existingLike != null)
//         {
//             // If the user has already liked, remove the like
//             post.UserLikes.Remove(existingLike);
//         }
//         else
//         {
//             // If the user hasn't liked, add the like
//             post.UserLikes.Add(new UserPostLike
//             {
//                 UserId = user.Id,
//                 PostId = postId,
//             });
//         }

//         var success = await _postRepository.UpdatePostAsync(post);

//         if (!success)
//         {
//             _logger.LogError("[PostController] An error occurred while updating like on post with PostId: {PostId}", postId);
//             return StatusCode(500, "An error occurred while updating the like status.");
//         }
//         /// Redirect back to the specific post section
//         return RedirectToAction(nameof(Index), "Home", new { section = $"post-{postId}" });
//     }
// }

