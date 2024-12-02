using Microsoft.AspNetCore.Mvc;
using NissGram.DAL;
using NissGram.DTOs;
using NissGram.Helpers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;

namespace NissGram.Controllers;



[ApiController]
[Route("api/[controller]")]
public class UserAPIController : Controller
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<UserAPIController> _logger;

    public UserAPIController(IUserRepository userRepository, ILogger<UserAPIController> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    [HttpGet("profile")]
    public async Task<IActionResult> Profile()
    {
        // Check if User.Identity or User.Identity.Name is null
        if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
            return Unauthorized(new { error = "User is not authenticated." });

        try
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.Identity.Name);

            if (user == null)
            {
                _logger.LogError("[UserController] Failed to find user with GetUserByUsernameAsync for username: {username}", User.Identity.Name);
                return NotFound(new { error = "User not found." });
            }

            var userProfileDto = MappingHelper.MapToUserProfileDto(user);
            return Ok(userProfileDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[UserController] Unexpected error occurred. Username: {Username}", User.Identity.Name);
            return StatusCode(500, new { error = "An unexpected error occurred. Please contact support." });
        }
    }


    [HttpGet("profile/{username}")]
    public async Task<IActionResult> ViewUserProfile(string username)
    {
        if (string.IsNullOrWhiteSpace(username))
        {
            _logger.LogWarning("[UserController] Attempted to view profile with an empty or null username.");
            return BadRequest(new { error = "Username cannot be empty." });
        }

        try
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user == null)
            {
                _logger.LogWarning("[UserController] User not found. Username: {Username}", username);
                return NotFound(new { error = "User not found." });
            }

            var userProfileDto = MappingHelper.MapToUserProfileDto(user);
            return Ok(userProfileDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[UserController] Unexpected error occurred. Username: {Username}", username);
            return StatusCode(500, new { error = "An unexpected error occurred. Please contact support." });
        }
    }

    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentUser()
    {
        if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
        {
            return Unauthorized("User is not authenticated.");
        }

        var currentUser = await _userRepository.GetUserByUsernameAsync(User.Identity.Name);

        if (currentUser == null)
        {
            return NotFound("User not found.");
        }

        // Use the mapping method to convert User to UserDto
        var userDto = MappingHelper.MapToUserDto(currentUser);

        return Ok(userDto);
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateUser([FromForm] UserUpdateDto userUpdateDto, IFormFile? profilePicture)
    {
        if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
        {
            return Unauthorized("User is not authenticated.");
        }

        var currentUserName = User.Identity.Name;
        var currentUser = await _userRepository.GetUserByUsernameAsync(currentUserName);

        if (currentUser == null)
        {
            return NotFound("User not found.");
        }

        try
        {
            // Handle profile picture upload
            if (profilePicture != null && profilePicture.Length > 0)
            {
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/profile_pictures");
                var fileName = Guid.NewGuid() + Path.GetExtension(profilePicture.FileName);
                var filePath = Path.Combine(uploadFolder, fileName);

                // Ensure the directory exists
                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }

                try
                {
                    // Save the file to the server
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await profilePicture.CopyToAsync(stream);
                    }

                    // Update user's profile picture path
                    currentUser.ProfilePicture = "/images/profile_pictures/" + fileName;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while uploading profile picture.");
                    return StatusCode(500, "An error occurred while uploading the profile picture.");
                }
            }

            // Update other user details using the mapping method
            MappingHelper.MapUserUpdateDtoToUser(currentUser, userUpdateDto);

            var updateSuccess = await _userRepository.UpdateUserAsync(currentUser);

            if (!updateSuccess)
            {
                _logger.LogError("[UserController] Failed to update user with username: {Username}", currentUserName);
                return StatusCode(500, "An error occurred while updating the user.");
            }

            return Ok(new { message = "User updated successfully.", profilePictureUrl = currentUser.ProfilePicture });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[UserController] An error occurred while updating user with username: {Username}", currentUserName);
            return StatusCode(500, "An unexpected error occurred.");
        }
    }


    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteUser()
    {
        try
        {
            var username = User.Identity?.Name;

            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("User is not authenticated.");
            }

            var user = await _userRepository.GetUserByUsernameAsync(username);
            if (user == null)
            {
                return NotFound("User account could not be found.");
            }

            // Delete profile picture logic here...

            var deleteSuccess = await _userRepository.DeleteUserByUsernameAsync(username);
            if (!deleteSuccess)
            {
                return StatusCode(500, "An error occurred while deleting your account.");
            }

            // Attempt to sign out
            try
            {
                await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
                _logger.LogInformation("User signed out successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error signing out the user.");
            }

            return Ok("Your account has been successfully deleted.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred during user deletion.");
            return StatusCode(500, "An unexpected error occurred. Please try again later.");
        }
    }


    [HttpGet("LikedPosts")]
    public async Task<IActionResult> LikedPosts()
    {


        // Authenticate the user
        var user = await _userRepository.GetUserByUsernameAsync(User.Identity?.Name ?? string.Empty);
        if (user == null)
        {
            return Unauthorized(new { error = "User is not authenticated." });
        }


        // Check if the user has liked the post
        var liked = _userRepository.GetLikedPostIds(user);

        return Ok(new
        {
            hasLiked = liked.Result
        });
    }



}
