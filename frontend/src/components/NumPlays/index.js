import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./NumPlays.css";

function NumPlays() {
  let { songId } = useParams();
  const dispatch = useDispatch();
  // get the song, user, and likes if applicable
  const songs = useSelector((state) => state.songs);
  songId = parseInt(songId);
  // find the song from the url
  const song = Object.values(songs).find((song) => song.id === songId);

  if (!song) return null;
  return <div className="num-plays">{song?.NumPlays}</div>;
}

export default NumPlays;
