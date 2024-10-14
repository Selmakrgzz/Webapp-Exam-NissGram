using Microsoft.EntityFrameworkCore;
namespace NissGram.Models;

public class NissDbContext : DbContext
{
    public NissDbContext(DbContextOptions<NissDbContext> options) : base(options)
    {
    }


    public DbSet<User> Users { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<UserPostLike> UserPostLikes { get; set; }



    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLazyLoadingProxies();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure the many-to-many relationship
        modelBuilder.Entity<UserPostLike>()
            .HasKey(upl => new { upl.UserId, upl.PostId });  // Composite key for the join table

        modelBuilder.Entity<UserPostLike>()
            .HasOne(upl => upl.User)
            .WithMany(u => u.LikedPosts)
            .HasForeignKey(upl => upl.UserId);

        modelBuilder.Entity<UserPostLike>()
            .HasOne(upl => upl.Post)
            .WithMany(p => p.UserLikes)
            .HasForeignKey(upl => upl.PostId);
    }
}
