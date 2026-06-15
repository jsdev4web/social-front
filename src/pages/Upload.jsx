import { useState } from "react";

function UploadPage() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:3000/profile/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      console.log("Uploaded:", data);

      window.location.href = "/profile"; // refresh profile view
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
    </div>
  );
}

export default UploadPage;