import { useState } from "react";
import { useNavigate, useLocation, useParams} from "react-router-dom";

function CreateComment() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

const { postId } = useParams();
console.log(postId)

  const handleSubmit = async (e) => {
  e.preventDefault();

  
  if (!content.trim()) {
    console.log("No content");
    return;
  }

  if (!postId) {
    console.log("No postId provided");
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        content,
        postId,   // 👈 NOW included
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create comment");
    }

    console.log("Comment submitted");
    setContent("");
    navigate("/dashboard");

  } catch (err) {
    console.error("Error creating comment:", err);
  }
};

  return (
    <>
      <h1>Create Comment</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Comment Content</label>
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
          <button type="submit">Submit Comment</button>
        </div>
      </form>
    </>
  );
}

export default CreateComment;