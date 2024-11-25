using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NissGram.DAL;
using NissGram.Models;
using NissGram.ViewModels;
using System.Security.Claims;


namespace NissGram.Controllers;
public class PostController : Controller
{
    private readonly IPostRepository _postRepository;
    private readonly IUserRepository _userRepository;
    private readonly ILogger<PostController> _logger;

    public PostController(IPostRepository postRepository, IUserRepository userRepository, ILogger<PostController> logger)
    {
        _userRepository = userRepository;
        _postRepository = postRepository;
        _logger = logger;
    }

    // GET: Vis detaljer for et enkelt innlegg, inkludert kommentarer og antall likes
    public async Task<IActionResult> Details(int id)
    {
        var post = await _postRepository.GetPostByIdAsync(id);
        if (post == null)
        {
            return NotFound();
        }
        return View(post);
    }

    // GET: Create Post Form
    [HttpGet]
    public IActionResult Create()
    {
        return View();
    }

    // POST: Create a new Post
    [HttpPost]
    public async Task<IActionResult> Create(Post post, IFormFile? uploadImage)
    {

        // Remove the User property from ModelState to ignore its validation
        ModelState.Remove(nameof(Post.User));

        // Check if User.Identity or User.Identity.Name is null
        if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
        {
            return Unauthorized("User is not authenticated.");
        }

        // Get the current user
        var user = await _userRepository.GetUserByUsernameAsync(User.Identity.Name);
        if (user == null)
        {
            ModelState.AddModelError("", "User not found.");
            return View(post);
        }


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

                post.ImgUrl = "/images/" + fileName;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while uploading image.");
                ModelState.AddModelError("", "An error occurred while uploading the image.");
                return View(post);
            }
        }

        post.User = user;
        post.DateCreated = DateTime.Now;
        post.DateUpdated = DateTime.Now;

        if (ModelState.IsValid)
            try
            {
                bool success = await _postRepository.CreatePostAsync(post);
                if (success)
                {
                    _logger.LogInformation("Post created successfully. Post data: {@Post}", post);
                    return RedirectToAction("Index", "Home");
                }

                // Log failure from the repository
                _logger.LogError("Failed to create a new post. Post data: {@Post}", post);
                ModelState.AddModelError("", "An unexpected error occurred while trying to create the post.");
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "An error occurred while creating a post. Post data: {@Post}", post);
                ModelState.AddModelError("", "A system error occurred while processing your request. Please contact support.");
            }
        return View(post);
    }

    // GET: Show the update form
    [HttpGet]
    public async Task<IActionResult> Update(int id)
    {
        var post = await _postRepository.GetPostByIdAsync(id);
        if (post == null)
        {
            return NotFound();
        }
        return View(post); // Viser oppdateringsskjemaet med eksisterende data
    }

    // POST: Update the post
    [HttpPost]
    public async Task<IActionResult> Update(Post post)
    {
        if (ModelState.IsValid)
        {
            var ok = await _postRepository.UpdatePostAsync(post);
            if (ok)
            {
                return RedirectToAction(nameof(Index));
            }
        }
        return View(post); // Viser skjemaet på nytt hvis validering mislyktes
    }


    // DELETE
    [HttpPost]
    public async Task<IActionResult> Delete(int id)
    {
        await _postRepository.DeletePostAsync(id);
        return RedirectToAction(nameof(Index));
    }
}
