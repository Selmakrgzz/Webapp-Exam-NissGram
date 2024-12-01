import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const [postDetails, setPostDetails] = useState({
    text: '',
    imageUrl: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null); // Ny tilstand for forhåndsvisning
  const [newImage, setNewImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Base URL for backend API or assets
  const BASE_URL = 'http://localhost:5024'; // Oppdater dette hvis backend kjører på et annet domene eller port

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/PostAPI/details/${postId}`, {
          method: 'GET',
          credentials: 'include', // Send cookies eller annen autentisering
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch post data');
        }
  
        const data = await response.json();
  
        console.log('Fetched post details:', data); // Logg data for feilsøking
  
        // Håndter ulike typer `imgUrl` med en sjekk for `null` eller `undefined`
        const fullImageUrl =
          data.imgUrl && data.imgUrl.startsWith('/images/')
            ? `${BASE_URL}${data.imgUrl}`
            : data.imgUrl
            ? `http://localhost:5024${data.imgUrl}`
            : null;
  
        setPostDetails({
          text: data.text || '',
          imageUrl: fullImageUrl || '', // Sett full URL i `imageUrl`
        });
  
        setImagePreview(fullImageUrl); // Oppdater forhåndsvisning
      } catch (err: any) {
        console.error('Error fetching post details:', err.message || err);
        setError(err.message || 'Failed to load post data.');
      } finally {
        setLoading(false);
      }
    };
  
    if (postId) {
      fetchPostDetails();
    }
  }, [postId]);
  
  

  const handleInputChange = (value: string) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      text: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected file:", file); // Legg til logging for å bekrefte filen
    if (file) {
      setNewImage(file);
  
      // Oppdater forhåndsvisning
      const reader = new FileReader();
      reader.onload = () => {
        //console.log("FileReader result:", reader.result); // Bekreft at FileReader fungerer
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = async () => {
    try {
      setLoading(true);
  
      const formData = new FormData();
      formData.append("text", postDetails.text);
      if (newImage) {
        formData.append("uploadImage", newImage); // Bruk samme nøkkel som i CreatePost
      }
  
      console.log("Sending the following data to backend:", {
        text: postDetails.text,
        image: newImage,
      });
  
      const response = await fetch(`${BASE_URL}/api/PostAPI/update/${postId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
  
      console.log("Backend response status:", response.status);
  
      if (!response.ok) {
        throw new Error("Failed to update post.");
      }
  
      const updatedPost = await response.json();
      console.log("Backend returned updated post details:", updatedPost);
  
      setPostDetails({
        text: updatedPost.text,
        imageUrl: `${BASE_URL}${updatedPost.imgUrl}`,
      });
  
      setImagePreview(`${BASE_URL}${updatedPost.imgUrl}?t=${new Date().getTime()}`); // Forhindre caching
  
      alert("Post updated successfully!");
      navigate("/");
    } catch (err: any) {
      console.error("Error updating post:", err.message || err);
      alert("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  


  const handleCancel = () => {
    navigate('/'); // Redirect to homepage without saving
  };

  if (loading) return <p>Loading post data...</p>;
  if (error) return <p className="text-danger">{error}</p>;

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
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <span className="text-muted">Image preview will appear here</span>
            )}
          </div>
        </div>

        {/* Right Column: Form Elements */}
        <div className="col-md-6">
          <form onSubmit={(e) => e.preventDefault()}>
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
                value={postDetails.text}
                onChange={(e) => handleInputChange(e.target.value)}
              ></textarea>
            </div>
            <br />

            {/* Buttons Section */}
            <div className="form-group d-flex justify-content-between align-items-center">
              {/* Upload Image Button */}
              <button
                type="button"
                className="btn btn-primary btn-lg btn-post"
                onClick={() => document.getElementById('uploadImage')?.click()}
              >
                Upload Image
              </button>
              {/* Hidden File Input */}
              <input
                type="file"
                id="uploadImage"
                className="file-input"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />

              {/* Update Button */}
              <button
                type="button"
                className="btn btn-success btn-lg btn-post"
                onClick={handleSave}
              >
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
