using Microsoft.EntityFrameworkCore;
using NissGram.DAL;
using Microsoft.AspNetCore.Identity;
using Serilog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Identity.UI.Services;
using NissGram.Models;

var builder = WebApplication.CreateBuilder(args);

// Set up connection string
var connectionString = builder.Configuration.GetConnectionString("NissDbContextConnection") 
    ?? throw new InvalidOperationException("Connection string 'NissDbContextConnection' not found.");

// Add services to the container
builder.Services.AddDbContext<NissDbContext>(options =>
{
    options.UseSqlite(builder.Configuration["ConnectionStrings:NissDbContextConnection"]);
});

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = false;
    options.SignIn.RequireConfirmedEmail = false;
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<NissDbContext>()
    .AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Identity/Account/Login";
    options.AccessDeniedPath = "/Identity/Account/AccessDenied";
    options.LogoutPath = "/Identity/Account/Logout";
    options.ExpireTimeSpan = TimeSpan.FromSeconds(1800);
});

builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();



// Add MVC and Razor Pages
builder.Services.AddControllersWithViews(config =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    config.Filters.Add(new AuthorizeFilter(policy));
});



// Add CORS for React integration
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", 
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
    });

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Set up Serilog logging
var loggerConfiguration = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.File($"Logs/app_{DateTime.Now:yyyyMMdd_HHmmss}.log");

var logger = loggerConfiguration.CreateLogger();
builder.Logging.AddSerilog(logger);

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    DBInit.Seed(app); // Seed data in development
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseStaticFiles();
app.UseRouting();
app.UseCors("CorsPolicy"); // Enable CORS
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(name:"api", pattern: "{controller}/{action=index}/{id?}");

app.Run();
