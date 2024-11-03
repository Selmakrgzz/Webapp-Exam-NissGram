function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = '<img src="' + e.target.result + '" alt="Image Preview">';
            
            // Fjern border og endre bakgrunn
            imagePreview.classList.remove('border');
            imagePreview.style.border = 'none';
            imagePreview.style.backgroundColor = 'transparent';

            // Legg til "has-image" klassen for å justere mellomrom med CSS
            imagePreview.classList.add('has-image');
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.innerHTML = '<span class="text-muted">Image preview will appear here</span>';

        // Tilbakestill til standard stil
        imagePreview.classList.add('border');
        imagePreview.style.backgroundColor = '#f8f9fa';

        // Fjern "has-image" klassen
        imagePreview.classList.remove('has-image');
    }
}
