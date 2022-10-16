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

  if (!song) return null;
  return (
    <div className="artist-preview-image">
      <img alt={"artist-img"} src={song?.Artist?.previewImage} />
      <div className="artist-username">{song?.Artist?.username}</div>
    </div>
  );
}

export default ArtistInfo;
