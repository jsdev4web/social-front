import { useEffect, useState } from "react";
import "../App.css";

import { useNavigate, Link } from "react-router";


function Sidebar() {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/dash/profiles`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/post/feed`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      setPosts(data);

      const likedIds = data
        .filter((post) => post.isLiked === true)
        .map((post) => post.id);

      setLikedPosts(likedIds);

    } catch (error) {
      console.error(error);
    }
  };

  fetchPosts();
}, []);

//is react seeing likes?
useEffect(() => {
}, [likedPosts]);

 const handleFollow = async (user) => {
  try {
    const route = `${import.meta.env.VITE_API_URL}/dash/follow`;

    await fetch(route, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followingId: user.id
      }),
    });

    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === user.id
          ? { ...profile, isFollowing: true }
          : profile
      )
    );

  } catch (error) {
    console.error(error);
  }
};

// i may just skip this!!!
const handleUnfollow = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/dash/unfollow`, {
  method: "POST"
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("User unFollowed")
    }
  }

  //handle comment
  const handleComment = (postId) => {
    navigate(`/create-comment/${postId}`);
  }

  //handle Like
  const handleLike = async (postId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post/${postId}/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
      }),
    });

    const data = await response.json();
    console.log("Backend response", data);

    if (response.ok) {
      setLikedPosts((prev) =>
        prev.includes(postId) ? prev : [...prev, postId]
      );
    }
  } catch (error) {
    console.error("Error liking post", error);
  }
};

  // logout
  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
    }
  };

  return (
  <div className="dashboard-container">
    <aside className="sidebar">
      <h2>People</h2>

      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        profiles.map((user) => (
          <div key={user.id} className="profile-row">
            <span>{user.name}</span>
            <button onClick={() => handleFollow(user)}>
              Follow
            </button>
          </div>
        ))
      )}
    </aside>

    <main className="main-content">
      <h1>Main Feed</h1>

      <div className="postProfileNav">
        <Link to="/create-post">Create Post</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/my-posts">My Posts</Link>
        <Link to="/following">Following</Link>
        <Link to="/friends">Friends</Link>

      </div>

     <div className="feed">
  {posts.length === 0 ? (
    <p>No posts yet.</p>
  ) : (
    posts.map((post) => (
      <div key={post.id} className="post-card">
        <h4>{post.author?.name || "unknown poster"}</h4>

        <p>{post.content}</p>

        <div className="post-actions">
          <button
            className={
              likedPosts.includes(Number(post.id))
                ? "liked-btn"
                : "unliked-btn"
            }
            onClick={() => handleLike(Number(post.id))}
          >
            Like
          </button>

          <button
            className="comment-btn"
            onClick={() => handleComment(post.id)}
          >
            Comment
          </button>
        </div>

              {/* COMMENTS */}
              <div className="comments-section">
                <h5>Comments</h5>

                {post.comments.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  post.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <strong>
                        {comment.author?.name || "Unknown User"}
                      </strong>

                      <p>{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </main>
  </div>
);
}

export default Sidebar;