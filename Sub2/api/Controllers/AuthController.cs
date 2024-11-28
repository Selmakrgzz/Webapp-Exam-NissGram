using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NissGram.DAL;
using NissGram.Models;
using NissGram.ViewModels;
using Microsoft.AspNetCore.Identity;


namespace NissGram.Controllers;


[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;

    public AuthController(SignInManager<User> signInManager, UserManager<User> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [AllowAnonymous] // No authentication required
    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("Test endpoint working.");
    }

    [AllowAnonymous] // No authentication required
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginViewModel model)
    {
        if (!ModelState.IsValid) return BadRequest("Invalid input.");

        var user = await _userManager.FindByNameAsync(model.Username);
        if (user == null) return Unauthorized("Invalid credentials.");

        var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, false);
        if (result.Succeeded) return Ok("Login successful.");

        return Unauthorized("Invalid credentials.");
    }

    [AllowAnonymous] // No authentication required
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
    {
        if (!ModelState.IsValid) return BadRequest("Invalid input.");

        var user = new User { UserName = model.Username, Email = model.Email };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded) return Ok("User registered successfully.");
        return BadRequest(result.Errors);
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok("Logged out successfully.");
    }
}
