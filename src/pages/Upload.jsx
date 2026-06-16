import { useState } from "react";

function UploadPage() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      console.log("Uploaded:", data);

      if (res.ok) {
        window.location.href = "/profile";
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/image`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      console.log("Deleted:", data);

      if (res.ok) {
        window.location.href = "/profile";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-card">
      <h3>Profile Image</h3>

      <div className="profile-image-section">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="profile-image-buttons">
          <button onClick={handleUpload}>
            Upload / Replace Image
          </button>

          <button onClick={handleDeleteImage}>
            Delete Image
          </button>
        </div>

        <button onClick={() => (window.location.href = "/profile")}>
          Back to Profile
        </button>
      </div>
    </div>
  );
}

export default UploadPage;