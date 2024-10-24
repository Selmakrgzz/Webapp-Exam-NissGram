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
    }
}