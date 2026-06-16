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
    <div>
      <h2>Upload Profile Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload
      </button>
      <button onClick={handleDeleteImage}>
        Delete Profile Image
      </button>
    </div>
  );
}

export default UploadPage;