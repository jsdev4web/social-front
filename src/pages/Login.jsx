import React, { useState } from "react";
import { Link, useNavigate } from "react-router"


function Login(){
     const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: password,
        }),
      });

      const data = await response.json();
 
      if (response.ok) {
        //console.log(data)
        // login success  i am sending data in url
        navigate(`/dashboard`);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        No account? <Link to="/signup">Sign up here</Link>
      </p>
    </>
  );


}

export default Login;