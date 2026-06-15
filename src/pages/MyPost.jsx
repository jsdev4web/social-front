import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FollowingPage() {
  const [myPosts, setMyPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/post/mypost`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        setMyPosts(data.myPosts);
        setFollowingPosts(data.followingPosts);

      } catch (error) {
        console.error(error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="content-page">

      <section>
        <h2>My Posts</h2>
        <div className="postProfileNav">
        <Link to="/dashboard">Back to Dashboard</Link></div>

        {myPosts.length === 0 ? (
          <p>You have not posted anything yet.</p>
        ) : (
          myPosts.map((post) => (
            <div key={post.id} className="post-card">
              <p>{post.content}</p>

              {post.comments.map((comment) => (
                <div key={comment.id}>
                  <strong>{comment.author?.name}</strong>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          ))
        )}
      </section>

      <section>
        <h2>Posts From People I Follow</h2>
         
        {followingPosts.length === 0 ? (
          <p>No posts from followed users.</p>
        ) : (
          followingPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h4>{post.author?.name}</h4>
              <p>{post.content}</p>

              {post.comments.map((comment) => (
                <div key={comment.id}>
                  <strong>{comment.author?.name}</strong>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          ))
        )}
      </section>

    </div>
  );
}

export default FollowingPage;