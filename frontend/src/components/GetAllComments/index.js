import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, deleteComment } from "../../store/comments.js";
import { useParams, useHistory } from "react-router-dom";
import "./GetAllComments.css";

const GetAllComments = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { songId } = useParams();
  const songs = useSelector((state) => state.songs);
  const user = useSelector((state) => state.session.user);
  const song = Object.values(songs).find(
    (song) => song.id === parseInt(songId)
  );
  const commentsObj = useSelector((state) => state.comments);
  const commentsArr = Object.values(commentsObj);

  useEffect(() => {
    dispatch(getComments(songId));
  }, [dispatch, songId]);

  let songComments = commentsArr.filter(
    (comment) => comment.songId === song.id
  );

  const getRelativeTime = (createdAt) => {
    const elapsedTime = new Date() - Date.parse(createdAt); // elapsed time in milliseconds
    const msMin = 1000 * 60; // number of ms in a minute
    const msHr = msMin * 60; // number of ms in a hour
    const msDay = msHr * 24; // number of ms in a day
    const msMo = msDay * 30.5; // approx number of ms in a month
    const msYr = msMo * 365; // number of ms in a year

    let interval = "YEARS";
    if (elapsedTime < msMin) interval = "SECONDS";
    else if (elapsedTime < msHr) interval = "MINUTES";
    else if (elapsedTime < msDay) interval = "HOURS";
    else if (elapsedTime < msMo) interval = "DAYS";
    else if (elapsedTime < msYr) interval = "MONTHS";

    switch (interval) {
      case "SECONDS":
        return Math.round(elapsedTime / 1000) + " seconds ago";
      case "MINUTES":
        return Math.round(elapsedTime / msMin) + " minutes ago";
      case "HOURS":
        return Math.round(elapsedTime / msHr) + " hours ago";
      case "DAYS":
        return Math.round(elapsedTime / msDay) + " days ago";
      case "MONTHS":
        return Math.round(elapsedTime / msMo) + " months ago";
      case "YEARS":
        return Math.round(elapsedTime / msYr) + " years ago";
      default:
        break;
    }
  };

  return (
    <>
      <div className="get-all-comments">
        <hr></hr>
        <br></br>
        <div>
          {" "}
          <i class="fa-regular fa-message"></i> {songComments.length} Comments
        </div>
        <br></br>
        <hr></hr>
        {songComments.map((comment) => (
          <>
            <div className="individual-comment">
              <div className="comment-author">
                {!comment.User && <div>{user?.username}:</div>}
                {comment?.User?.username && (
                  <div>{comment?.User?.username}:</div>
                )}
              </div>
              <div className="comment-end">
                <div>{getRelativeTime(comment.createdAt)}</div>
                {comment.userId === user?.id && (
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={async () => {
                      await dispatch(deleteComment(comment.id));
                      return history.push(`/songs/${song.id}`);
                    }}
                  ></i>
                )}
              </div>
            </div>
            <div key={comment.id} className="comment-body">
              {comment.body}
            </div>
          </>
        ))}
      </div>
    </>
  );
};
export default GetAllComments;
