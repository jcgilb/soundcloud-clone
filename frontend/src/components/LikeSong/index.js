import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  likeASong,
  deleteLike,
  getSongLikes,
  //   getLikes,
} from "../../store/likes";
import "./LikeSong.css";

function LikeSong({ songFromUrl }) {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState();
  // get the song, user, and likes if applicable
  const songs = useSelector((state) => state.songs);
  const likes = useSelector((state) => state.likes);
  console.log("state likes", likes);
  const user = useSelector((state) => state.session.user);
  console.log("songId", songId); // id 1
  // find the song from the url
  const song = Object.values(songs).find(
    (song) => song.id === parseInt(songId)
  );
  // filter out all the likes that don't belong to this song
  const songLikes = Object.values(likes).filter(
    (like) => like.songId !== songId
  );
  console.log(songLikes, "songLieks");
  // see if the current user liked the song
  const like = songLikes.find((like) => like.userId === user.id);
  console.log("song", song); // id 1
  console.log("user", user); // id 6
  console.log("like", like); // undefined

  useEffect(() => {
    if (like) setLiked(true);
    if (!like) setLiked(false);
  }, []);

  useEffect(() => {
    dispatch(getSongLikes(songId));
    // dispatch(getLikes());
  }, [dispatch, songId]);

  if (!song) return null;
  return (
    <button
      className={liked ? "liked" : "disliked"}
      onClick={async () => {
        // if like is undefined
        if (!like) {
          setLiked(true);
          await dispatch(likeASong(songId));
          console.log("liked t/f", liked);
        }
        // if like is defined
        if (like) {
          setLiked(false);
          await dispatch(deleteLike(like.id));
        }

        console.log("liked t/f", liked);
      }}
    >
      {liked && (
        <>
          <i className={"fas fa-heart"} /> <span>Liked</span>
        </>
      )}
      {!liked && (
        <>
          <i className={"fas fa-heart"} /> <span>Like</span>
        </>
      )}
    </button>
  );
}

export default LikeSong;
