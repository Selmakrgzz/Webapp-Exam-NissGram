import React, { useState, useEffect } from "react";
import "../../styles/createPost.css";

interface UpdatePostProps {
  postId: number;
  existingImgUrl: string | null; // Null hvis ingen eksisterende bilde-URL
  text: string;
  onUpdate: (postId: number, updatedText: string, updatedImage: File | null) => void;
}

const UpdatePost: React.FC<UpdatePostProps> = ({ postId, existingImgUrl, text, onUpdate }) => {
  const [currentText, setCurrentText] = useState<string>(text);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(existingImgUrl);

  // Oppdater forhåndsvisning når ny fil velges
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Håndter innsending av oppdateringen
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(postId, currentText, newImage);
  };

  return (
    <div className="container mt-3">
      <div className="text-center mb-4">
        <h2>Update your post!</h2>
      </div>

      <div className="row">
        {/* Left Column: Image Preview */}
        <div className="col-md-6 d-flex justify-content-center">
          <div id="imagePreview" className="border">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image Preview"
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Hidden field for PostId */}
            <input type="hidden" value={postId} />

            {/* Text Area for updating text */}
            <div className="form-group md-1">
              <label htmlFor="textArea" className="font-weight-bold">
                Content
              </label>
              <textarea
                className="form-control form-control-lg"
                id="textArea"
                rows={6}
                placeholder="Write something..."
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
              ></textarea>
            </div>
            <br />

            {/* Buttons Section */}
            <div className="form-group d-flex justify-content-between align-items-center">
              {/* Upload Image Button */}
              <button
                type="button"
                className="btn btn-primary btn-lg btn-post"
                onClick={() => document.getElementById("uploadImage")?.click()}
              >
                Upload Image
              </button>
              {/* Hidden File Input */}
              <input
                type="file"
                id="uploadImage"
                className="file-input"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              {/* Update Button */}
              <button type="submit" className="btn btn-primary btn-lg btn-post">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
