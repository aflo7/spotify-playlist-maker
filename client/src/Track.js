import React from "react"
import "./css/track.css"

const Track = ({ name, img, album, artist }) => {
  return (
    <div className="track-wrapper">
      <img src={img} alt={name} className="album-cover" />
      <div className="track-text-wrapper">
        <div className="track-name">Name: <strong>{name}</strong></div>
        <div className="album-name">Album: <strong>{album}</strong></div>
        <div className="artist-name">Artist: <strong>{artist}</strong></div>
      </div>
    </div>
  )
}

export default Track
