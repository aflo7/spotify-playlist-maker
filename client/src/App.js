import React, { useEffect, useState } from "react"
import Login from "./Login"
import Home from "./Home"

const code = new URLSearchParams(window.location.search).get("code")

const App = () => {

  return (
    <div>
      {code ? <Home code={code} /> : <Login />}
    </div>
  )
}

export default App
