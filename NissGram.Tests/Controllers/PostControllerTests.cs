using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using NissGram.Controllers;
using NissGram.DAL.Repositories;
using NissGram.Models;
using Microsoft.EntityFrameworkCore.Design;

namespace NissGram.Tests.Controllers;

public class PostControllerTests
{
    // POSITIVE TEST : INDEX
    [Fact]
    public async Task TestIndexValid()
    {
        // ARRANGE

        // Simulerer at repositoriet returnerer en liste med innlegg
        var testUser = new User
        {
            UserName = "JaneDoe",
            Email = "jane.doe@example.com",
            Password = "password456"
        };
        var posts = new List<Post>
        {
            new Post {
            User = testUser, // User object as input in the relation
            Text = "Today I went to the park and enjoyed the sunshine.",
            ImgUrl = null,
            DateCreated = DateTime.Now,
            DateUpdated = DateTime.Now
            },
            new Post {
            User = testUser, // User object as input in the relation
            Text = null,
            ImgUrl = "/wwwroot/images/profile_image_default.png",
            DateCreated = DateTime.Now,
            DateUpdated = DateTime.Now
            }
        };

        var mockPostRepository = new Mock<IPostRepository>();
        var postController = new PostController(mockPostRepository.Object);

        mockPostRepository
            .Setup(repo => repo.GetAllPostsAsync())
            .ReturnsAsync(posts); // Simulerer vellykket henting av innlegg

        // ACT
        var result = await postController.Index();

        // ASSERT
        var viewResult = Assert.IsType<ViewResult>(result); // Sjekker at resultatet er en ViewResult
        var model = Assert.IsAssignableFrom<List<Post>>(viewResult.Model); // Sjekker at modellen er av type List<Post>
        Assert.Equal(2, model.Count); // Bekrefter at antallet innlegg er riktig
    }

    // NEGATIVE TEST : INDEX
    [Fact]
    public async Task TestIndexInvalid()
    {
        // ARRANGE
        var mockPostRepository = new Mock<IPostRepository>();
        var postController = new PostController(mockPostRepository.Object);

        // Simulerer at repositoriet returnerer en tom liste
        mockPostRepository
            .Setup(repo => repo.GetAllPostsAsync())
            .ReturnsAsync(new List<Post>()); // Simulerer at det ikke finnes noen innlegg

        // ACT
        var result = await postController.Index();

        // ASSERT
        var viewResult = Assert.IsType<ViewResult>(result); // Sjekker at resultatet er en ViewResult
        var model = Assert.IsAssignableFrom<List<Post>>(viewResult.Model); // Sjekker at modellen er av type List<Post>
        Assert.Empty(model); // Bekrefter at modellen er tom
    }

    // POSITIVE TEST : CREATE
    [Fact]
    public async Task TestCreateValid()
    {
        // ARRANGE
        var testUser = new User
        {
            UserName = "JaneDoe",
            Email = "jane.doe@example.com",
            Password = "password456"
        };

        var testPost = new Post
        {
            User = testUser, // User object as input in the relation
            Text = "Today I went to the park and enjoyed the sunshine.",
            ImgUrl = null,
            DateCreated = DateTime.Now,
            DateUpdated = DateTime.Now
        };

        var mockPostRepository = new Mock<IPostRepository>();
        mockPostRepository
            .Setup(repo => repo.CreatePostAsync(It.IsAny<Post>()))
            .Returns(Task.CompletedTask); // Simulates successful method completion

        var postController = new PostController(mockPostRepository.Object);
        postController.ModelState.Clear(); // Clear ModelState to simulate a valid model

        // ACT
        var result = await postController.Create(testPost);

        // ASSERT
        Assert.True(postController.ModelState.IsValid, "Expected ModelState to be valid.");
        
        var viewResult = Assert.IsType<ViewResult>(result); // Ensure the result is a ViewResult
        Assert.Equal(testPost, viewResult.Model); // Check that the model in the ViewResult is correct

        // Verify that CreatePostAsync was called exactly once with a Post object matching the expected properties
        mockPostRepository.Verify(repo => repo.CreatePostAsync(It.Is<Post>(p =>
            p.User.UserName == "JaneDoe" &&
            p.Text == "Today I went to the park and enjoyed the sunshine."
        )), Times.Once);
    }

    // NEGATIVE TEST : CREATE
    [Fact]
    public async Task TestCreateInvalid()
    {
        // ARRANGE
        var testUser = new User
        {
            UserName = "JaneDoe",
            Email = "jane.doe@example.com",
            Password = "password456"
        };

        var testPostWithoutTextAndImage = new Post
        {
            User = testUser, // Gyldig bruker
            Text = "", // Ingen tekst
            ImgUrl = null,
            DateCreated = DateTime.Now,
            DateUpdated = DateTime.Now
        };

        var testPostWithoutUser = new Post
        {
            User = null, // Ingen bruker
            Text = "Valid text.", // Gyldig tekst
            ImgUrl = null,
            DateCreated = DateTime.Now,
            DateUpdated = DateTime.Now
        };

        var mockPostRepository = new Mock<IPostRepository>();
        var postController = new PostController(mockPostRepository.Object);

        // ACT - for Post uten tekst og bilde
        postController.ModelState.Clear(); // Tømmer ModelState for å simulere gyldig inngang
        postController.ModelState.AddModelError("Text", "Either Text or ImgUrl is required."); // Legger til valideringsfeil
        var resultWithoutTextAndImage = await postController.Create(testPostWithoutTextAndImage);

        // ASSERT for Post uten tekst og bilde
        Assert.IsType<ViewResult>(resultWithoutTextAndImage); // Sjekker at resultatet er en ViewResult
        Assert.False(postController.ModelState.IsValid, "Expected ModelState to be invalid for missing text and image."); // Bekrefter at ModelState er ugyldig
        mockPostRepository.Verify(repo => repo.CreatePostAsync(It.IsAny<Post>()), Times.Never); // Sjekker at CreatePostAsync ikke ble kalt

        // ACT - Test for Post uten bruker
        postController.ModelState.Clear(); // Tømmer ModelState for å simulere gyldig inngang
        postController.ModelState.AddModelError("User", "User is required."); // Legger til valideringsfeil
        var resultWithoutUser = await postController.Create(testPostWithoutUser);

        // ASSERT for Post uten bruker
        Assert.IsType<ViewResult>(resultWithoutUser); // Sjekker at resultatet er en ViewResult
        Assert.False(postController.ModelState.IsValid, "Expected ModelState to be invalid for missing user."); // Bekrefter at ModelState er ugyldig
        mockPostRepository.Verify(repo => repo.CreatePostAsync(It.IsAny<Post>()), Times.Never); // Sjekker at CreatePostAsync ikke ble kalt
    }

    // POSITIVE TEST : UPDATE
    [Fact]
    public async Task TestUpdateValid()
    {
        // ARRANGE
        var testUser = new User
        {
            UserName = "JaneDoe",
            Email = "jane.doe@example.com",
            Password = "password456"
        };

        var testPost = new Post
        {
            PostId = 1, // Assume ID for update
            User = testUser,
            Text = "Updated text for the post.",
            ImgUrl = null,
            DateCreated = DateTime.Now,
            DateUpdated = DateTime.Now
        };

        var mockPostRepository = new Mock<IPostRepository>();
        mockPostRepository
            .Setup(repo => repo.UpdatePostAsync(It.IsAny<Post>()))
            .Returns(Task.CompletedTask); // Simulate successful update

        var postController = new PostController(mockPostRepository.Object);
        postController.ModelState.Clear(); // Clear ModelState to simulate valid model

        // ACT
        var result = await postController.Update(testPost);

        // ASSERT
        Assert.True(postController.ModelState.IsValid, "Expected ModelState to be valid.");

        var redirectResult = Assert.IsType<RedirectToActionResult>(result); // Check for RedirectToActionResult
        Assert.Equal(nameof(postController.Index), redirectResult.ActionName); // Check redirection to Index

        // Verify that UpdatePostAsync was called with the correct Post data
        mockPostRepository.Verify(repo => repo.UpdatePostAsync(It.Is<Post>(p =>
            p.PostId == 1 && // Confirm ID is correct
            p.User.UserName == "JaneDoe" &&
            p.Text == "Updated text for the post."
        )), Times.Once);
    }


    // NEGATIVE TEST : UPDATE
    [Fact]
    public async Task TestUpdateInvalid()
    {
        // ARRANGE
        var testUser = new User
        {
            UserName = "JaneDoe",
            Email = "jane.doe@example.com",
            Password = "password456"
        };

        // Create a post that simulates a non-existent one (e.g., wrong ID)
        var testPostWithInvalidId = new Post
        {
            PostId = 999, // Assume this ID does not exist
            User = testUser,
            Text = "Valid text.",
            ImgUrl = null,
            DateCreated = DateTime.Now,
            DateUpdated = DateTime.Now
        };

        var mockPostRepository = new Mock<IPostRepository>();
        var postController = new PostController(mockPostRepository.Object);

        // Simulate that the repository will not find the post
        mockPostRepository
            .Setup(repo => repo.UpdatePostAsync(It.Is<Post>(p => p.PostId == 999)))
            .ThrowsAsync(new KeyNotFoundException("Post not found."));

        // Clear ModelState to simulate valid input
        postController.ModelState.Clear();

        // ACT
        var result = await postController.Update(testPostWithInvalidId);

        // ASSERT
        var viewResult = Assert.IsType<ViewResult>(result); // Check that the result is a ViewResult
        Assert.False(postController.ModelState.IsValid, "Expected ModelState to be invalid for missing post."); // Ensure ModelState is invalid

        // Verify that UpdatePostAsync was called with the post that has an invalid ID
        mockPostRepository.Verify(repo => repo.UpdatePostAsync(It.Is<Post>(p => p.PostId == 999)), Times.Once);
    }

    // POSITIVE TEST : DELETE
    [Fact]
    public async Task TestDeleteValid()
    {
        // ARRANGE
        int testId = 1; // ID-en til posten som skal slettes

        var mockPostRepository = new Mock<IPostRepository>();
        mockPostRepository
            .Setup(repo => repo.DeletePostAsync(It.IsAny<int>()))
            .Returns(Task.CompletedTask); // Simulerer at metoden fullfører uten feil

        var postController = new PostController(mockPostRepository.Object);

        // ACT
        var result = await postController.Delete(testId);

        // ASSERT
        var redirectResult = Assert.IsType<RedirectToActionResult>(result); // Sjekker at resultatet er RedirectToActionResult
        Assert.Equal(nameof(postController.Index), redirectResult.ActionName); // Bekrefter at omdirigeringen går til Index
        mockPostRepository.Verify(repo => repo.DeletePostAsync(testId), Times.Once); // Sjekker at DeletePostAsync ble kalt én gang med testId
    }

    // NEGATIVE TEST : DELETE
    [Fact]
    public async Task TestDeleteInvalid()
    {
        // ARRANGE
        var mockPostRepository = new Mock<IPostRepository>();
        var postController = new PostController(mockPostRepository.Object);
        int nonExistentPostId = 999; // Assume this ID does not exist

        // Simulate that the post with the specified ID does not exist
        mockPostRepository
            .Setup(repo => repo.DeletePostAsync(nonExistentPostId))
            .ThrowsAsync(new KeyNotFoundException("Post not found.")); // Throw exception on delete

        // ACT
        var result = await postController.Delete(nonExistentPostId);

        // ASSERT
        var redirectResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal(nameof(postController.Index), redirectResult.ActionName); // Check redirection
    }


}
