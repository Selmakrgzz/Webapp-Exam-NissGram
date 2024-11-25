using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NissGram.DAL;
using NissGram.Models;
using NissGram.ViewModels;


namespace NissGram.Controllers;
public class PostController : Controller
{
    private readonly IPostRepository _postRepository;
    private readonly ILogger<PostController> _logger;

    public PostController(IPostRepository postRepository, ILogger<PostController> logger)
    {
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

        // MIDLERTIDIG FØR INNLOGGING ER PÅ PLASS
        ModelState.Remove("User");

        post.User = await _postRepository.TempGetRandUser();
     
        if (uploadImage != null && uploadImage.Length > 0)
        {
            // Generate a unique file name and path
            var fileName = Guid.NewGuid() + Path.GetExtension(uploadImage.FileName);
            var filePath = Path.Combine("wwwroot/images", fileName);

            // Save the file to wwwroot/images
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await uploadImage.CopyToAsync(stream);
            }

            // Set the ImgUrl to the relative path for the database
            post.ImgUrl = "/images/" + fileName;
        }

        post.DateCreated = DateTime.Now;
        post.DateUpdated = DateTime.Now;



        if (ModelState.IsValid)
        {
            bool ok = await _postRepository.CreatePostAsync(post);
            if (ok)
            {
                return RedirectToAction(nameof(Index));
            }
        }
        else
        {
            foreach (var entry in ModelState)
            {
                foreach (var error in entry.Value.Errors)
                {
                    Console.WriteLine($"Key: {entry.Key}, Error: {error.ErrorMessage}");
                }
            }
            Console.WriteLine("Model state is invalid");
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

