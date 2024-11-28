using System.ComponentModel.DataAnnotations;

namespace NissGram.ViewModels
{
    public class PostUpdateViewModel // Sørg for at denne er public
    {
        public int PostId { get; set; }
        public string? Text { get; set; }
        public string? ExistingImgUrl { get; set; }
        public IFormFile? NewImage { get; set; }
    }
}
