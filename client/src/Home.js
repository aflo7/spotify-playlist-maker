import React, { useState, useEffect } from "react"
import useAuth from "./useAuth"
import SpotifyWebApi from "spotify-web-api-node"
import "./css/home.css"
import Track from "./Track"

const spotifyApi = new SpotifyWebApi()

const Home = ({ code }) => {
  const [genres, setGenres] = useState()
  const [genreOutput, setGenreOutput] = useState([])
  const accessToken = useAuth(code)
  const [searchResults] = useState([])
  const [currGenre, setCurrGenre] = useState("acoustic")
  const [tracks, setTracks] = useState([])
  const [playlistName, setPlaylistName] = useState("")
  const [userId, setUserId] = useState("")
  const [trackIDs, setTrackIDs] = useState([])
  const [playlistId, setPlaylistId] = useState("")

  const handleGenreChange = (e) => {
    setCurrGenre(e.target.value)
  }

  const createTracks = () => {
    spotifyApi
      .getRecommendations({
        min_energy: 0.4,
        seed_genres: [currGenre],
        min_popularity: 50
      })
      .then(
        function (data) {
          let tracks = data.body.tracks
          setTracks(tracks)
        },
        function (err) {
          console.log("Something went wrong!", err)
        }
      )
  }

  const addPlaylist = (e) => {
    e.preventDefault()
    // create an empty playlist and store its ID in state
    spotifyApi
      .createPlaylist(playlistName, {
        description: "",
        public: true
      })
      .then(
        function (data) {
          setPlaylistId(data.body.id)
          // console.log("Created playlist!", data.body.id)
        },
        function (err) {
          console.log("Something went wrong!", err)
        }
      )
    // create an array of track ID's that will be added into this playlist
    setTrackIDs(tracks.map((track) => "spotify:track:" + track.id))
  }

  useEffect(() => {
    if (!playlistId || !trackIDs) return
    // main logic for adding songs to created playlist
    spotifyApi
      .addTracksToPlaylist(
        playlistId,
        trackIDs.map((track) => track)
      )
      .then(
        function (data) {
          // console.log("Added tracks to playlist!")
        },
        function (err) {
          console.log("Something went wrong!", err)
        }
      )
  }, [playlistId, trackIDs])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)

    spotifyApi.getAvailableGenreSeeds().then(
      function (data) {
        setGenres(data.body.genres)
      },
      function (err) {
        console.log("could not get genres", err)
      }
    )

    spotifyApi.getMe().then((user) => setUserId(user.body.id))
  }, [accessToken])

  return (
    <div className="home-wrapper">
      <div className="genre-select-wrapper">
        {genres ? (
          <div htmlFor="genres" className="genre-text">
            Choose a genre:
          </div>
        ) : null}
        <select
          name="genres"
          id="genres"
          onChange={(e) => handleGenreChange(e)}
        >
          {genres
            ? genres.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))
            : null}
        </select>
      </div>

      <div className="create-wrapper">
        <div className="song-wrapper" onClick={() => createTracks()}>
          Create a random playlist
        </div>
      </div>

      <div className="playlist-wrapper">
        {tracks
          ? tracks.map((track) => (
              // console.log(track)
              <Track
                key={track.id}
                name={track.name}
                img={track.album.images[0].url}
                album={track.album.name}
                artist={track.artists[0].name}
              />
            ))
          : null}
      </div>

      <div className="add-to-library-wrapper">
        {tracks.length > 0 ? (
          <>
            <form onSubmit={(e) => addPlaylist(e)}>
              <input
                placeholder="Playlist name..."
                type="text"
                id="username"
                name="username"
                required
                onChange={(e) => setPlaylistName(e.target.value)}
              />

              <input type="submit" className="add-to-library-btn"/>
            </form>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Home

