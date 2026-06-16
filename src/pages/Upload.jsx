import { useEffect, useState } from "react";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        credentials: "include",
      });

      const data = await res.json();
      console.log("Profile:", data);

      if (res.ok) {
        setUser(data);
      } else {
        setMessage(data.message || "Could not load profile");
      }
    } catch (error) {
      console.error(error);
      setMessage("Profile fetch failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setMessage("No file selected");
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
        setMessage("Image uploaded");
        setFile(null);

        if (data.user) {
          setUser(data.user);
        } else {
          fetchProfile();
        }
      } else {
        setMessage(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
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
        setMessage("Image deleted");

        if (data.user) {
          setUser(data.user);
        } else {
          setUser((prev) => ({
            ...prev,
            image: null,
          }));
        }
      } else {
        setMessage(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Delete failed");
    }
  };

  const imageSrc = user?.image?.startsWith("http")
    ? user.image
    : user?.image
      ? `${import.meta.env.VITE_API_URL}${user.image}`
      : null;

  return (
  <div className="profile-card">
    <h3>Profile Image</h3>

    {message && <p>{message}</p>}

    {/* IMAGE DIV ONLY */}
    <div className="image-box">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="profile"
          className="profile-image"
        />
      ) : (
        <p>No profile image yet.</p>
      )}
    </div>

    {/* BUTTONS / INPUT DIV ONLY */}
    <div className="button-box">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload / Replace Image
      </button>

      <button onClick={handleDeleteImage}>
        Delete Image
      </button>

      <button onClick={() => (window.location.href = "/profile")}>
        Back to Profile
      </button>
    </div>
  </div>
);
}

export default UploadPage;