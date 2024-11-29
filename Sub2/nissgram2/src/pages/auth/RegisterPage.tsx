import React, { useState } from "react";
import "../../styles/auth.css";
import DefaultProfilePicture from "../../assets/images/profile_image_default.png";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(DefaultProfilePicture);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Håndter bildeopplastning og forhåndsvisning
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Valider skjemaet før innsending
  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill out all required fields.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  // Håndter innsending av skjemaet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("about", about);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    console.log("Form Data:", {
      username,
      email,
      firstName,
      lastName,
      about,
      phoneNumber,
      password,
      confirmPassword,
    });
    

    try {
      // Endre URL-en til backend-endpointet ditt
      const response = await fetch("http://localhost:5024/api/auth/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: formData
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to register user.");
      }

      alert("Registration successful!");
      // Naviger til en annen side, f.eks. login-siden
      window.location.href = "/login";
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <form
        id="registerForm"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Profile Picture Upload Section */}
        <div className="mb-4 text-center position-relative">
          <div className="fs-5 fw-bold mb-2">Profile Picture</div>
          <div
            id="profileImagePreview"
            className="rounded-circle mx-auto mb-3"
            style={{
              width: "150px",
              height: "150px",
              overflow: "hidden",
              backgroundColor: "#f8f9fa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              id="profileImage"
              src={preview || DefaultProfilePicture}
              alt="Profile Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
          <input
            type="file"
            id="uploadProfilePicture"
            name="uploadImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfilePictureChange}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => document.getElementById("uploadProfilePicture")?.click()}
          >
            Upload Image
          </button>
        </div>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label fs-5 fw-bold">
            Username<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-5 fw-bold">
            Email<span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label fs-5 fw-bold">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label fs-5 fw-bold">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* About */}
        <div className="mb-3">
          <label htmlFor="about" className="form-label fs-5 fw-bold">
            About
          </label>
          <textarea
            id="about"
            className="form-control"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label fs-5 fw-bold">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-5 fw-bold">
            Password<span className="text-danger">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fs-5 fw-bold">
            Confirm Password<span className="text-danger">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-100 mb-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" style={{ textDecoration: "underline" }}>
              Log in here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
