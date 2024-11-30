import React, { useState } from "react";
import "../../styles/layout.css";
import "../../styles/createPost.css";

const CreatePost: React.FC = () => {
  const [text, setText] = useState<string>(""); // For teksten
  const [image, setImage] = useState<File | null>(null); // For bildet
  const [preview, setPreview] = useState<string | null>(null); // For forhåndsvisning
  const [error, setError] = useState<string | null>(null); // For feilmeldinger
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // For å vise lastestatus

  // Håndter bildeopplastning og forhåndsvisning
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    if (!text && !image) {
      setError("You must provide either text or an image.");
      return;
    }
  
    setIsSubmitting(true);
  
    // Opprett FormData for å håndtere fil og tekst
    const formData = new FormData();
    formData.append("text", text);
    if (image) {
      formData.append("uploadimage", image); // Bruk riktig felt som backend forventer
    }
  
    try {
      const response = await fetch("http://localhost:5024/api/PostAPI/create", {
        method: "POST",
        body: formData, // Send FormData direkte
      });
  
      if (!response.ok) {
        throw new Error("Failed to create post.");
      }
  
      // Tilbakestill skjema ved suksess
      setText("");
      setImage(null);
      setPreview(null);
      setError(null);
      alert("Post created successfully!");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="container mt-3">
      <div className="text-center mb-4">
        <h2>Share something!</h2>
      </div>

      <div className="row">
        {/* Left Column: Image Preview */}
        <div className="col-md-6 d-flex justify-content-center">
          <div id="imagePreview" className="border">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <span className="text-muted">Image preview will appear here</span>
            )}
          </div>
        </div>

        {/* Right Column: Form Elements */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {/* Validation Summary */}
            {error && <div className="text-danger mb-3">{error}</div>}

            {/* Text Area */}
            <div className="form-group mb-3">
              <textarea
                className="form-control form-control-lg"
                id="textArea"
                rows={6}
                placeholder="Write something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>

            {/* Buttons Section */}
            <div className="form-group d-flex justify-content-between align-items-center">
              {/* Upload Image Button */}
              <button
                type="button"
                className="btn btn-primary btn-lg btn-post"
                onClick={() =>
                  document.getElementById("uploadImage")?.click()
                }
              >
                Upload Image
              </button>
              {/* Hidden File Input */}
              <input
                type="file"
                id="uploadImage"
                name="uploadImage"
                className="file-input"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-post"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
