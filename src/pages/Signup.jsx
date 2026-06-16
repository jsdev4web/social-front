import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"

function Signup(){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("")

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
    e.preventDefault();
    // Login Auth logic

    //clear messages
    setError('');
    setMessage('');

    //Set loading
    setLoading(true)

    const userData = {
      user,
      password,
    };

    try {
      //Send post to backend api
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/sign-up`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if(response.ok) {
        setMessage(data.message); //success message
        navigate("/login")
      } else {
        setError(data.message); // Error message
      }
    } catch (error) {
      setError('Something is wrong')
    } finally {
      setLoading(false)
    }
  };

    return (
    <>
        <h1>Signup Page</h1>
         <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>

         <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Sign Up</button>

      </form> <br />
      <Link to="/">Click here to go back</Link>
    </>
    )
}

export default Signup;