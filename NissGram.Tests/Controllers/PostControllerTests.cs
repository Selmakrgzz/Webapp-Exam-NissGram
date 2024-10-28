using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NissGram.Controllers;
using NissGram.DAL;
using NissGram.DAL.Repositories;
using NissGram.Models;
using NissGram.ViewModels;

namespace NissGram.Test.Controllers;

public class PostControllerTests
{
    [Fact]
    public async Task TestIndex()
    {
        // arrange
        var user1 = new {UserId = 1; UserName = "Choco_12"; Email = "Choco@gmail.com"; Password = "passwd"; FirstName = "Gunnild"; LastName = "Hansen"; ProfilePicture = "/images/profile_image_default.png"; PhoneNr = "20202020"; }
        var user2 = new {UserId = 2; UserName = "Worri32"; Email = "Worri@gmail.com"; Password = "passwd123"; FirstName = "Gunnar"; LastName = "Bergensen"; ProfilePicture = "/images/profile_image_default.png"; PhoneNr = "84848484"; }

        var postList = new List<Post>()
        {
            new Post
            {
            User = user1, 
            Text = null,
            ImgUrl = "/wwwroot/images/profile_image_default", 
            DateCreated = DateTime.Now,
            DateUpdated = DateTime.Now
            },
            new Post
            {
            User = user2, 
            Text = "lorem ipsum ipsum",
            ImgUrl = null, 
            DateCreated = DateTime.Now,
            DateUpdated = DateTime.Now
            }
        };

        // mock the repository
        var mockPostRepository = new Mock<IPostRepository>();
        mockPostRepository.Setup(repo => repo.GetAllPostsAsync).ReturnsAsync(postList);
        var mockLogger = new Mock<ILogger<PostController>>();
        var PostController = new PostController(mockPostRepository.Object, mockLogger.Object);

        // act
        var result = await PostController.Index();

        // assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var posts = Assert.IsAssignableFrom<List<Post>>(viewResult.ViewData.Model);
        Assert.Equal(2, itemsViewModel.Items.Count());
        Assert.Equal(itemList, itemsViewModel.Items);
    
    }
}