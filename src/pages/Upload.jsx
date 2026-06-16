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
      {user?.image ? (
        <img
          src={imageSrc}
          alt="profile"
          className="profile-image"
        />
      ) : (
        <p>No profile image yet.</p>
      )}

      <div className="profile-image-buttons">
        <Link to="/upload">
          <button>Edit Image</button>
        </Link>

        {user?.image && (
          <button onClick={handleDeleteImage}>
            Delete Image
          </button>
        )}
      </div>
    </div>
  </div>
);
}

export default UploadPage;