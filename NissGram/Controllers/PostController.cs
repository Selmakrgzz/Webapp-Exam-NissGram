using Microsoft.AspNetCore.Mvc;
using NissGram.DAL.Repositories;
using NissGram.Models;

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
    public async Task<IActionResult> Create(Post post)
    {
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

