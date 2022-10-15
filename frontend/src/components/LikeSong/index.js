import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeASong, deleteLike } from "../../store/likes";
import "./LikeSong.css";

function LikeSong() {
  let { songId } = useParams();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState();
  // get the song, user, and likes if applicable
  const songs = useSelector((state) => state.songs);
  const likes = useSelector((state) => state.likes);
  const user = useSelector((state) => state.session.user);
  songId = parseInt(songId);
  // find the song from the url
  const song = Object.values(songs).find((song) => song.id === songId);
  // filter out all the likes that don't belong to this song
  const likesArray = Object.values(likes);
  let songLikes = likesArray.filter((like) => like.songId === songId);
  // see if the current user liked the song
  const like = songLikes.find((like) => like.userId === user?.id);

  // setters for displaying like/already liked
  useEffect(() => {
    if (like) setLiked(true);
    if (!like) setLiked(false);
  }, [like, songId]);

  if (!song) return null;
  return (
    <button
      className={liked ? "liked" : "disliked"}
      onClick={async () => {
        // if like is undefined, like the song
        if (!like) {
          await dispatch(likeASong(songId));
        }
        // if like is defined, unlike it
        if (like) {
          await dispatch(deleteLike(like.id));
        }
      }}
    >
      {like && (
        <>
          {/* render already liked button */}
          <i className={"fas fa-heart"} /> <span>Liked</span>
        </>
      )}
      {!like && (
        <>
          {/* render like button */}
          <i className={"fas fa-heart"} /> <span>Like</span>
        </>
      )}
    </button>
  );
}

export default LikeSong;
