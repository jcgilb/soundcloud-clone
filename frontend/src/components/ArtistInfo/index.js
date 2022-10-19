import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ArtistInfo.css";

function ArtistInfo() {
  let { songId } = useParams();
  const dispatch = useDispatch();
  // get the song
  const songs = useSelector((state) => state.songs);
  songId = parseInt(songId);
  // find the song from the url
  const song = Object.values(songs).find((song) => song.id === songId);
  // find current artist/user
  const artist = useSelector((state) => state.artists.artist);

  if (!song) return null;
  return (
    <div className="artist-preview-image">
      {song?.Artist && (
        <>
          <img alt={"artist-img"} src={song?.Artist?.previewImage} />
          <div className="artist-username">{song?.Artist?.username}</div>
        </>
      )}
      {!song?.Artist && artist && (
        <>
          <img alt={"artist-img"} src={artist?.previewImage} />
          <div className="artist-username">{artist?.username}</div>
        </>
      )}
    </div>
  );
}

export default ArtistInfo;
