import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createComment, getOneComment } from "../../store/comments.js";
import { getArtist } from "../../store/artists.js";
import { clearArtist } from "../../store/artists.js";
import "./CreateAComment.css";

const CreateNewComment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // parse song id from url
  let { songId } = useParams();
  // get comment body, set comment body
  const [body, setBody] = useState("");
  const songs = useSelector((state) => state.songs);
  // identify the song from the url
  const song = Object.values(songs).find(
    (song) => song.id === parseInt(songId)
  );
  // identify the current user
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (user) {
      const handlePageMount = async () => {
        await dispatch(getArtist(user.id));
      };
      handlePageMount();
    }
    return () => {
      dispatch(clearArtist());
    };
  }, [dispatch]);

  // identify the currentArtist/user
  const thisArtist = useSelector((state) => state.artists.artist);

  // helper function for clearing the input
  const revert = () => {
    setBody("");
  };
  // handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // error handling for when a user tries to submit a comment if not logged in
    if (!user || user === null) {
      alert("Please log in or create an account to post comments.");
      // erase the comment body
      revert();
    }
    const newComment = {
      body,
    };
    // send comment body and song id to createComment thunk
    let comment = await dispatch(createComment(newComment, songId));
    // if successful, post the comment
    if (comment) {
      console.log("getting last comment");
      await dispatch(getOneComment(comment.id));
      revert();
      history.push(`/songs/${song.id}`);
    }
  };

  return (
    <div className="write-comment">
      {/* SoundCloud uses this greyish square to style the comment form */}
      <div style={{ height: "54px", width: "54px" }} className="weird-box">
        {thisArtist?.previewImage && (
          <img alt="profile-pic" src={thisArtist?.previewImage} />
        )}
        {!thisArtist?.previewImage && (
          <img
            alt="box"
            src={
              "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664117317/icons/commentsquare_lphvlw.jpg"
            }
          />
        )}
      </div>
      <form className="create-comment-form" onSubmit={handleSubmit}>
        <input
          type="body"
          placeholder="Write a comment"
          value={body}
          required // simple error handling for when a user tries to post a comment without a body
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="new-comment" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewComment;
