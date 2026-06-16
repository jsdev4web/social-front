import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
          credentials: "include",
        });

        const data = await res.json();
        console.log("PROFILE DATA:", data);

        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  const imageSrc = profile.image;

  return (
    <div className="profile-page">
      {/* USERNAME */}
      <div className="profile-header">
        <h2>{profile.name}</h2>
      </div>

      <div className="postProfileNav">
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>

      {/* IMAGE SECTION */}
      <div className="profile-image-section">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="profile"
            className="profile-img"
          />
        ) : (
          <Link to="/upload">Upload Profile Image</Link>
        )}

        <div>
          <Link to="/upload">Edit Profile Image</Link>
        </div>
      </div>

      {/* POSTS */}
      <div className="profile-posts">
        <h3>Your Posts</h3>

        {profile.posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          profile.posts.map((post) => (
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
      </div>
    </div>
  );
}

export default ProfilePage;