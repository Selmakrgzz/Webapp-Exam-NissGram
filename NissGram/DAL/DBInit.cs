using Microsoft.EntityFrameworkCore;
using NissGram.Models;

namespace NissGram.DAL;

public static class DBInit
{
    public static void Seed(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        NissDbContext context = serviceScope.ServiceProvider.GetRequiredService<NissDbContext>();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        if (!context.Users.Any())
        {
            var users = new List<User>
            {
                new User
                {
                    UserName = "Nico123",
                    Email = "nico123@example.com",
                    Password = "password123"
                },
                new User
                {
                    UserName = "JaneDoe",
                    Email = "jane.doe@example.com",
                    Password = "password456"
                },
                new User
                {
                    UserName = "JohnSmith",
                    Email = "john.smith@example.com",
                    Password = "password789"
                }
            };

            context.AddRange(users);
            context.SaveChanges();
        }

        if (!context.Posts.Any())
        {
            var posts = new List<Post>
            {
                new Post
                {
                    Title = "My First Post",
                    Content = "This is the content of my first post!",
                    UserId = context.Users.First(u => u.UserName == "Nico123").UserId, // Assumes UserId is available
                    CreatedAt = DateTime.Now
                },
                new Post
                {
                    Title = "A Day in the Life",
                    Content = "Today I went to the park and enjoyed the sunshine.",
                    UserId = context.Users.First(u => u.UserName == "JaneDoe").UserId, // Assumes UserId is available
                    CreatedAt = DateTime.Now
                }
            };

            context.AddRange(posts);
            context.SaveChanges();
        }
    }
}
