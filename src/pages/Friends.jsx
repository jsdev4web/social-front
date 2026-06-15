import { useEffect, useState } from "react";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/friends", {
        credentials: "include",
      });

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await fetch("http://localhost:3000/friends/follow", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followingId: userId }),
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isFollowing: true } : u
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await fetch("http://localhost:3000/friends/unfollow", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followingId: userId }),
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isFollowing: false } : u
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="users-page">
      <h2>All Users</h2>

      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">

            <p className="username">{user.name}</p>

            <div>
              {!user.isFollowing ? (
                <button
                  onClick={() => handleFollow(user.id)}
                >
                  Follow
                </button>
              ) : (
                <button
                  onClick={() => handleUnfollow(user.id)}
                >
                  Unfollow
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersPage;