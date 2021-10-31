import React from 'react'
import './css/login.css'


const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=807d04c4cdf8462dae4f541e5579155c&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20playlist-modify%20user-library-read%20playlist-modify-private%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

function Login() {

  return (
    <div className="login-button">
      <a href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  )
}

export default Login
