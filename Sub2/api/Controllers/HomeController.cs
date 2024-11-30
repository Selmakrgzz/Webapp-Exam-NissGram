using Microsoft.AspNetCore.Mvc;
using NissGram.DAL;
using NissGram.DTOs;


namespace NissGram.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeAPIController : ControllerBase
{
    private readonly ILogger<HomeAPIController> _logger;
    private readonly IPostRepository _postRepository;


    public HomeAPIController(ILogger<HomeAPIController> logger, IPostRepository postRepository)
    {
        _logger = logger;
        _postRepository = postRepository;
    }

    [HttpGet("index")]
    public async Task<IActionResult> Index()
    {
        var posts = await _postRepository.GetAllPostsAsync();
        if (posts == null || !posts.Any())
        {
            _logger.LogError("[HomeAPIController] No posts found while executing _postRepository.GetAllPostsAsync()");
            return NotFound("No posts found.");
        }

        var postDtos = posts.Select(post => new PostDto
        {
            PostId = post.PostId,
            Username = post.User.UserName ?? "Unknown", // For possible null value
            Text = post.Text,
            ImgUrl = post.ImgUrl,
            DateCreated = post.DateCreated,
            DateUpdated = post.DateUpdated,
            LikeCount = post.UserLikes.Count,
            CommentCount = post.UserComments.Count
        });

        return Ok(postDtos);
    }




}

