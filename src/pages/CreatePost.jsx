import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Post() {
  const [content, setContent] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // if you're using Passport sessions
        body: JSON.stringify({
          content,
        }),
      });

      console.log("Post submitted");
      setContent("");
      navigate("/dashboard");

    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Post Content</label>
        </div>

         <textarea
          id="content"
          name="content"
          rows="5"
          cols="50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
        />


        <div>
          <button type="submit">Submit Post</button>
        </div>
      </form>
    </>
  );
}

export default Post;