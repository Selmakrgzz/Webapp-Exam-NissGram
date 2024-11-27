using Microsoft.AspNetCore.Mvc;
using NissGram.Models;
using NissGram.ViewModels;
using NissGram.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;

namespace NissGram.Controllers;

public class UserController : Controller
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    // GET: /Users
    public async Task<IActionResult> GetAllUsers()
    {
        // Fetch all users from the repository
        var users = await _userRepository.GetAllUsersAsync();

        if (users == null || !users.Any())
        {
            return View("Error", "Could not retrieve users.");
        }

        // Create an instance of UsersViewModel with the list of users
        var viewModel = new UsersViewModel(users, "All users");

        // Pass the ViewModel to the view
        return View(viewModel);
    }

    [HttpGet]
    public async Task<IActionResult> Profile()
    {

        // Check if User.Identity or User.Identity.Name is null
        if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
        {
            return Unauthorized("User is not authenticated.");
        }

        var currentUser = await _userRepository.GetUserByUsernameAsync(User.Identity.Name);

        if (currentUser == null)
        {
            return NotFound("User not found.");
        }

        /*if (string.IsNullOrEmpty(currentUser.ProfilePicture))
       {
           currentUser.ProfilePicture = "/images/profile_image_default.png"; // Ensure default picture
       }*/

        var userProfileViewModel = new UserProfileViewModel(currentUser);

        return View(userProfileViewModel);
    }

    [HttpGet]
    public async Task<IActionResult> UserUpdateCreate()
    {

        
        // Check if User.Identity or User.Identity.Name is null
        if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
        {
            return Unauthorized("User is not authenticated.");
        }

        var currentUser = await _userRepository.GetUserByUsernameAsync(User.Identity.Name);

        if (currentUser == null)
        {
            return NotFound("User not found.");
        }

        /*if (string.IsNullOrEmpty(currentUser.ProfilePicture))
        {
            currentUser.ProfilePicture = "/images/profile_image_default.png"; // Ensure default picture
        }*/

        var model = new UserUpdateCreateViewModel
        {
            ProfilePicture = currentUser.ProfilePicture,  //?? "/images/profile_images_default.png",
            About = currentUser.About,
            Username = currentUser.UserName ?? "",  // Ensure the UserName is not null
            FirstName = currentUser.FirstName,
            LastName = currentUser.LastName,
            Email = currentUser.Email ?? "", // Ensure Email is not null
            PhoneNumber = currentUser.PhoneNumber,
        };

        return View("UserUpdateCreate", model);
    }

    [HttpPost]
    public async Task<IActionResult> UserUpdateCreate(UserUpdateCreateViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model); // Redisplay the form with validation errors
        }

        var currentUserName = User.Identity?.Name;

         if (string.IsNullOrEmpty(currentUserName))
        {
            return Unauthorized("User is not authenticated.");
        }

        var currentUser = await _userRepository.GetUserByUsernameAsync(currentUserName);
        

        if (currentUser == null)
        {
            return NotFound("User not found.");
        }

        // if ((await _userRepository.GetAllUsersAsync())
        //     .Any(u => u.UserName == model.Username && u.Id != currentUser.Id))
        // {
        //     ModelState.AddModelError("Username", "This username is already taken.");
        //     return View(model);
        // }

        // if (Request.Form["deleteProfilePicture"] == "true")
        // {
        //     currentUser.ProfilePicture = "/images/profile_images_default.png";
        // }
        // else 
        if (Request.Form.Files.Count > 0)
        {
            var file = Request.Form.Files[0];
            if (file.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var uploadsFolder = Path.Combine("wwwroot", "uploads", "profile-pictures");
                Directory.CreateDirectory(uploadsFolder);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                currentUser.ProfilePicture = $"/uploads/profile-pictures/{fileName}";
            }
        }

        currentUser.About = model.About;
        currentUser.UserName = model.Username;
        currentUser.FirstName = model.FirstName;
        currentUser.LastName = model.LastName;
        currentUser.Email = model.Email;
        currentUser.PhoneNumber = model.PhoneNumber;

        await _userRepository.UpdateUserAsync(currentUser);

        return RedirectToAction(nameof(Profile));
    }

     //Delete User 
    [HttpPost]
    public async Task<IActionResult> DeleteUser()
    {
        try
        {
            // Ensure user is authenticated before attempting to delete
            if (string.IsNullOrEmpty(User.Identity?.Name))
            {
                return Unauthorized("User is not authenticated.");
            }

            // Get the username of the current user
            var username = User.Identity.Name;

            // Fetch the user from the database
            var user = await _userRepository.GetUserByUsernameAsync(username);

             // Delete the profile picture if it exists and is not the default picture
            if (!string.IsNullOrEmpty(user?.ProfilePicture) && 
                user.ProfilePicture != "/images/profile_image_default.png")
            {
                var filePath = Path.Combine("wwwroot", user.ProfilePicture.TrimStart('/'));
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }
            // Delete the user from the database
            await _userRepository.DeleteUserByUsernameAsync(username);

            // Sign the user out after deletion
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

            // Redirect to the login page or homepage
            return RedirectToAction("Index", "Home");
        }
        catch (Exception ex)
        {
            // Log any exception and return an appropriate error response
            return StatusCode(500, $"An error occurred while deleting the account: {ex.Message}");
        }
    }

    [HttpGet]
    public async Task<IActionResult> DeleteProfilePicture()
    {
         // Ensure user is authenticated before proceeding
        if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
        {
            return Unauthorized("User is not authenticated.");
        }

        var currentUser = await _userRepository.GetUserByUsernameAsync(User.Identity.Name);

        if (currentUser == null)
        {
            return NotFound("User not found.");
        }

        if (!string.IsNullOrEmpty(currentUser.ProfilePicture) &&
            currentUser.ProfilePicture != "/images/profile_image_default.png")
        {
            var filePath = Path.Combine("wwwroot", currentUser.ProfilePicture.TrimStart('/'));
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }

        currentUser.ProfilePicture = "/images/profile_image_default.png"; // Reset to default
        await _userRepository.UpdateUserAsync(currentUser);

        return RedirectToAction(nameof(UserUpdateCreate));
    }


    [HttpGet]
    public async Task<IActionResult> ViewUserProfile(string username)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        var userProfileViewModel = new UserProfileViewModel(user);

        return View(userProfileViewModel);
    }

    [HttpGet]
    public IActionResult RedirectToChangePassword()
    {
        // Redirecting to the ChangePassword Razor Page
        return RedirectToPage("/Identity/Account/Manage/ChangePassword");
    }

}
