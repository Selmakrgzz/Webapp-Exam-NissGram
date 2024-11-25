using Microsoft.AspNetCore.Mvc;
using NissGram.Models;
using NissGram.ViewModels;
using NissGram.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace NissGram.Controllers;
public class UserController : Controller
{
    private readonly NissDbContext _context;

    public UserController(NissDbContext context)
    {
        _context = context;
    }


    // GET: /Users
    public async Task<IActionResult> GetAllUsers()
    {
        // Fetch all users from the database
        var users = await _context.Users.ToListAsync();

        // Create an instance of UsersViewModel with the list of users
        var viewModel = new UsersViewModel(users, "All users");
    

        // Pass the ViewModel to the view
        return View(viewModel);
    }



    //GET: /Users/Details/5
    [HttpGet]
    public async Task<IActionResult> GetProfile(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        // Fetch user by ID
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        return View(user);
    }

}