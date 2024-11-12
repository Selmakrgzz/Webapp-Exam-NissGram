using Microsoft.AspNetCore.Identity.UI.Services;
using System.Threading.Tasks;
public class DummyEmailSender : IEmailSender
{
    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        // This method does nothing, as it's a dummy implementation
        return Task.CompletedTask;
    }
}