using Microsoft.AspNetCore.Mvc;

namespace NissGram.Controllers
{
    public class UserController : Controller
    {
        private readonly NissDbContext _context;

        public UsersController(NissDbContext context)
        {
            _context = context;
        }


        // GET: /Users
        public async Task<IActionResult> GetAllUsers()
        {
            // Fetch all users from the database
            var users = await _context.Users.ToListAsync();
            return View(users);  // Pass the list of users to the view
        }



        // GET: /Users/Details/5
        [HttpGet]
        public async Task<IActionResult> GetProfile(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            // Fetch user by ID
            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.UserId == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

    }
}