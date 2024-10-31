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
            var userNico = context.Users.FirstOrDefault(u => u.UserName == "Nico123");
            var userJane = context.Users.FirstOrDefault(u => u.UserName == "JaneDoe");

            var posts = new List<Post>
            {
                new Post
                {
                    User = userNico, // Brukerobjektet for å sette relasjonen
                    Text = null,
                    ImgUrl = "/wwwroot/images/profile_image_default", // Legg til en passende URL for bildet
                    DateCreated = DateTime.Now,
                    DateUpdated = DateTime.Now
                },
                new Post
                {
                    User = userJane, // Brukerobjektet for å sette relasjonen
                    Text = "Today I went to the park and enjoyed the sunshine.",
                    ImgUrl = null,
                    DateCreated = DateTime.Now,
                    DateUpdated = DateTime.Now
                }
            };

            context.AddRange(posts);
            context.SaveChanges();
        }

    }
}
