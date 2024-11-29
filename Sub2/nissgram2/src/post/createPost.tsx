import React from "react";
import "../styles/layout.css"; // Hvis layout.css er nødvendig
import "../styles/createPost.css"; // CSS for denne komponenten

const CreatePost: React.FC = () => {
  return (
    <div className="container mt-3">
      <div className="text-center mb-4">
        <h2>Share something!</h2>
      </div>

      <div className="row">
        {/* Left Column: Image Preview */}
        <div className="col-md-6 d-flex justify-content-center">
          <div id="imagePreview" className="border">
            <span className="text-muted">Image preview will appear here</span>
          </div>
        </div>

        {/* Right Column: Form Elements */}
        <div className="col-md-6">
          <form>
            <div className="text-danger"></div>
            <div className="form-group mb-3">
              <textarea
                className="form-control form-control-lg"
                id="textArea"
                rows={6}
                placeholder="Write something..."
              ></textarea>
              <span className="text-danger"></span>
            </div>
            <div className="form-group d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-secondary btn-upload me-2"
                onClick={() =>
                  document.getElementById("uploadImage")?.click()
                }
              >
                Upload Image
              </button>
              <input
                type="file"
                id="uploadImage"
                name="uploadImage"
                className="file-input"
                accept="image/*"
                style={{ display: "none" }}
              />
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-post"
              >
                Post
              </button>
            </div>
            <div className="text-danger mt-2" style={{ display: "none" }}>
              You must provide either text or an image.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
