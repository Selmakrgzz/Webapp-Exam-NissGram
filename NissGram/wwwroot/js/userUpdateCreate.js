/* Preview uploaded profile picture
function previewProfileImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const preview = document.getElementById('profileImagePreview');

    if (file) {
        reader.onload = function (e) {
            // Display the preview image
            preview.innerHTML = `<img src="${e.target.result}" alt="Profile Picture Preview" 
                                  style="max-width: 150px; max-height: 150px; object-fit: contain;" />`;
        };
        reader.readAsDataURL(file);
    } else {
        // Display placeholder text if no image is uploaded
        preview.innerHTML = '<span class="text-muted">No image uploaded</span>';
    }
}

// Attach the upload trigger to the custom button
document.getElementById('uploadProfilePictureButton').addEventListener('click', function () {
    document.getElementById('uploadProfilePicture').click();
});

// Attach change event to the file input
document.getElementById('uploadProfilePicture').addEventListener('change', previewProfileImage);*/

// Preview uploaded profile picture
// Preview uploaded profile picture
function previewProfileImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const preview = document.getElementById('profileImagePreview');

    if (file) {
        reader.onload = function (e) {
            // Display the preview image
            preview.innerHTML = `<img src="${e.target.result}" alt="Profile Picture Preview" 
                                  style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />`;

            // Enable the delete button
            document.getElementById('deleteProfilePictureButton').disabled = false;
        };
        reader.readAsDataURL(file);
    }
}

// Attach the upload trigger to the "+" button
document.getElementById('uploadProfilePictureButton').addEventListener('click', function () {
    document.getElementById('uploadProfilePicture').click();
});

// Attach change event to the file input
document.getElementById('uploadProfilePicture').addEventListener('change', previewProfileImage);

// Handle delete button functionality
document.getElementById('deleteProfilePictureButton').addEventListener('click', function () {
    const preview = document.getElementById('profileImagePreview');

    // Clear the preview
    preview.innerHTML = '<span class="text-muted" style="font-size: 14px;">No Image</span>';

    // Disable the delete button
    this.disabled = true;

    // Clear the file input
    document.getElementById('uploadProfilePicture').value = '';
});

document.getElementById('deleteProfilePictureButton').addEventListener('click', function () {
    const preview = document.getElementById('profileImagePreview');

    // Clear the preview
    preview.innerHTML = '<img src="/images/profile_image_default.png" alt="Default Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />';

    // Set the hidden input to "true"
    document.getElementById('deleteProfilePicture').value = "true";

    // Disable the delete button
     //this.disabled = true;

    // Clear the file input
    document.getElementById('uploadProfilePicture').value = '';
});

