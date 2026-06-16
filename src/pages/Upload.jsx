import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
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

      <button onClick={() => navigate("/profile")}>
        Back to Profile
      </button>
    </div>
  );
}

export default UploadPage;