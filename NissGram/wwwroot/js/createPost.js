function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0];

    if (file) {
        console.log("JavaScript function  running");

        const reader = new FileReader();
        reader.onload = function(e) {
            // Set the image as the content and remove any placeholder text
            imagePreview.innerHTML = '<img src="' + e.target.result + '" alt="Image Preview">';

            // Remove border and background color for clean display
            imagePreview.classList.remove('border');
            imagePreview.style.border = 'none';
            imagePreview.style.backgroundColor = 'blue';

            // Add a class to control styling when an image is loaded
            imagePreview.classList.add('has-image');
        };
        reader.readAsDataURL(file);
    } else {
        // Reset to placeholder text and default styling if no image is loaded
        imagePreview.innerHTML = '<span class="text-muted">Image preview will appear here</span>';

        // Restore border and background color
        imagePreview.style.border = '1px solid #ddd';
        imagePreview.style.backgroundColor = '#f8f9fa';

        // Remove the class for image-loaded styling
        imagePreview.classList.remove('has-image');
    }

}
