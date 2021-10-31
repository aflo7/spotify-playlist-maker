const express = require("express")
const SpotifyWebApi = require("spotify-web-api-node")
const cors = require("cors")
const bodyParser = require("body-parser")

const credentials = {
  redirectUri: "http://localhost:3000/",
  clientId: "807d04c4cdf8462dae4f541e5579155c",
  clientSecret: "dbdb3da3dac34a1ea0fe694a66dc32bd"
}

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post("/login", (req, res) => {
  const spotifyApi = new SpotifyWebApi(credentials)
  const code = req.body.code

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch((err) => {
      res.sendStatus(400)
    })

})

app.listen(3001)
